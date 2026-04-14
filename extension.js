const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
const { ensureRqmd, runRqmd, initOutputChannel } = require('./bootstrap');

// RQMD-PACKAGING-017: Subcommand → instruction file (path segments relative to extension root).
// Skills load as system context; prompts load for commands without a dedicated skill file.
const SUBCOMMAND_MAP = {
    brainstorm: ['skills', 'rqmd-brainstorm', 'SKILL.md'],
    triage:     ['skills', 'rqmd-triage',     'SKILL.md'],
    go:         ['prompts', 'go.prompt.md'],
    next:       ['prompts', 'next.prompt.md'],
    refine:     ['prompts', 'refine.prompt.md'],
    commit:     ['prompts', 'commit.prompt.md'],
    verify:     ['skills', 'rqmd-verify',     'SKILL.md'],
    pin:        ['skills', 'rqmd-pin',        'SKILL.md'],
    feedback:   ['skills', 'rqmd-feedback',   'SKILL.md'],
    docs:       ['skills', 'rqmd-docs',       'SKILL.md'],
};

function stripFrontmatter(content) {
    return content.replace(/^---[\s\S]*?---\n?/, '');
}

function loadInstructions(command, extensionRoot) {
    const parts = SUBCOMMAND_MAP[command];
    if (!parts) return null;
    try {
        const raw = fs.readFileSync(path.join(extensionRoot, ...parts), 'utf8');
        return stripFrontmatter(raw).trim();
    } catch {
        return null;
    }
}

function activate(context) {
    // rqmd contributes prompts, skills, and agents declaratively via package.json.

    // RQMD-EXT-060: create the Output channel for bootstrap diagnostics.
    initOutputChannel(context);

    // RQMD-EXT-057/058: Check that rqmd is installed at extension startup.
    // If missing, the bootstrap will install it (and uv if needed) and notify
    // the user.  This avoids the painful flow of approving 10 individual commands
    // just to run rqmd when it isn't installed on the workstation.
    ensureRqmd(context).catch(err => console.error('[rqmd] bootstrap error at startup:', err));

    // RQMD-PACKAGING-016: "rqmd: Initialize Project" command palette action.
    // Runs `rqmd init` in an integrated terminal so the CLI produces the AI
    // handoff prompt.  The user then pastes that output into Copilot Chat,
    // which drives the full interview flow and writes only project-specific
    // files (.github/skills/dev, .github/skills/test, starter requirement docs).
    // Shared rqmd defaults (prompts, skills, agents) stay in the extension.
    const initDisposable = vscode.commands.registerCommand('rqmd.initProject', async () => {
        // RQMD-EXT-058/059: bootstrap + rerun-original-command via runRqmd.
        // If rqmd is missing it installs first (concurrency-safe, debounced),
        // then execs the command in the terminal automatically.
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const cwd = workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0].uri.fsPath
            : undefined;

        const didRun = await runRqmd(context, ['init'], { terminalName: 'rqmd init', cwd });
        if (!didRun) return; // bootstrap failed or major mismatch — already notified

        vscode.window.showInformationMessage(
            'rqmd init is running. Copy the output prompt and paste it into Copilot Chat to complete project setup.',
            'Open Copilot Chat'
        ).then(selection => {
            if (selection === 'Open Copilot Chat') {
                vscode.commands.executeCommand('workbench.panel.chat.view.copilot.focus');
            }
        });
    });

    context.subscriptions.push(initDisposable);

    // RQMD-PACKAGING-017: @rqmd chat participant with subcommand handling.
    // Each subcommand loads its skill or prompt file as system instructions, then
    // forwards the request to the model already selected by Copilot.
    const extensionRoot = context.extensionUri.fsPath;
    const participant = vscode.chat.createChatParticipant(
        'rqmd.rqmd',
        async (request, _ctx, response, token) => {
            const instructions = loadInstructions(request.command, extensionRoot);
            const query = request.prompt.trim();

            if (!request.command && !query) {
                const commandList = Object.keys(SUBCOMMAND_MAP).map(c => `\`${c}\``).join(', ');
                response.markdown(`Type \`@rqmd <command>\` to start. Available commands: ${commandList}.`);
                return;
            }

            const messages = [];
            if (instructions) {
                messages.push(vscode.LanguageModelChatMessage.User(instructions));
                messages.push(vscode.LanguageModelChatMessage.Assistant('Understood.'));
            }
            messages.push(vscode.LanguageModelChatMessage.User(query || 'Start the workflow.'));

            try {
                const chatResponse = await request.model.sendRequest(messages, {}, token);
                for await (const chunk of chatResponse.text) {
                    response.markdown(chunk);
                }
            } catch (err) {
                if (err.name !== 'AbortError') {
                    response.markdown(`**Error:** ${err.message}`);
                }
            }
        }
    );
    participant.isSticky = true;
    context.subscriptions.push(participant);

    console.log('rqmd extension activated');
}

function deactivate() {}

module.exports = { activate, deactivate };
