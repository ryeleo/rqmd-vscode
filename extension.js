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

    // RQMD-EXT-066: DocumentLinkProvider — makes requirement IDs clickable in any file.
    // Builds an ID→{absPath, anchor, lineNum} index by scanning docs/requirements/ in each
    // workspace folder, then registers a provider that turns every known RQMD-XXX-NNN
    // occurrence into a one-click link that opens markdown preview at the stable anchor.

    /** @type {Map<string, {absPath: string, anchor: string, lineNum: number}>} */
    const requirementIndex = new Map();

    function buildRequirementIndex() {
        requirementIndex.clear();
        const folders = vscode.workspace.workspaceFolders;
        if (!folders) return;
        const HEADING_RE = /^### (RQMD-[A-Z]+-\d+):/;
        for (const folder of folders) {
            const reqDir = path.join(folder.uri.fsPath, 'docs', 'requirements');
            if (!fs.existsSync(reqDir)) continue;
            let files;
            try {
                files = fs.readdirSync(reqDir).filter(f => f.endsWith('.md') && f !== 'README.md');
            } catch {
                continue;
            }
            for (const file of files) {
                const absPath = path.join(reqDir, file);
                let lines;
                try {
                    lines = fs.readFileSync(absPath, 'utf8').split('\n');
                } catch {
                    continue;
                }
                for (let i = 0; i < lines.length; i++) {
                    const m = lines[i].match(HEADING_RE);
                    if (m) {
                        const reqId = m[1];
                        requirementIndex.set(reqId, {
                            absPath,
                            anchor: reqId.toLowerCase(),
                            lineNum: i,
                        });
                    }
                }
            }
        }
    }

    // RQMD-EXT-066: Command invoked when a requirement link is clicked.
    // Opens the requirement file in markdown preview scrolled to its stable anchor.
    // Falls back to the editor at the heading line if preview is unavailable.
    const openRequirementDisposable = vscode.commands.registerCommand(
        'rqmd.openRequirement',
        async (args) => {
            const { absPath, anchor, lineNum } = typeof args === 'string' ? JSON.parse(args) : args;
            const fileUri = vscode.Uri.file(absPath).with({ fragment: anchor });
            try {
                await vscode.commands.executeCommand('markdown.showPreview', fileUri);
            } catch {
                // Fallback: open in editor and scroll to the heading line
                const doc = await vscode.workspace.openTextDocument(vscode.Uri.file(absPath));
                const editor = await vscode.window.showTextDocument(doc);
                const pos = new vscode.Position(Math.max(0, lineNum), 0);
                editor.selection = new vscode.Selection(pos, pos);
                editor.revealRange(new vscode.Range(pos, pos), vscode.TextEditorRevealType.AtTop);
            }
        }
    );

    // RQMD-EXT-066: DocumentLinkProvider for all files in the workspace.
    // Only IDs present in the index get links — unknown IDs produce no link.
    const ID_REGEX = /\bRQMD-[A-Z]+-\d+\b/g;
    const linkProvider = vscode.languages.registerDocumentLinkProvider(
        { scheme: 'file' },
        {
            provideDocumentLinks(document) {
                const links = [];
                const text = document.getText();
                const re = new RegExp(ID_REGEX.source, 'g');
                let match;
                while ((match = re.exec(text)) !== null) {
                    const entry = requirementIndex.get(match[0]);
                    if (!entry) continue;
                    const startPos = document.positionAt(match.index);
                    const endPos = document.positionAt(match.index + match[0].length);
                    const range = new vscode.Range(startPos, endPos);
                    const cmdArgs = encodeURIComponent(JSON.stringify({
                        absPath: entry.absPath,
                        anchor: entry.anchor,
                        lineNum: entry.lineNum,
                    }));
                    const target = vscode.Uri.parse(`command:rqmd.openRequirement?${cmdArgs}`);
                    links.push(new vscode.DocumentLink(range, target));
                }
                return links;
            },
        }
    );

    // RQMD-EXT-066: Rebuild the index when requirement files change.
    const reqWatcher = vscode.workspace.createFileSystemWatcher('**/docs/requirements/**/*.md');
    reqWatcher.onDidChange(() => buildRequirementIndex());
    reqWatcher.onDidCreate(() => buildRequirementIndex());
    reqWatcher.onDidDelete(() => buildRequirementIndex());

    // Initial index build
    buildRequirementIndex();

    context.subscriptions.push(openRequirementDisposable, linkProvider, reqWatcher);

    console.log('rqmd extension activated');
}

function deactivate() {}

module.exports = { activate, deactivate };
