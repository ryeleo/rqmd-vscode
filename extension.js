const vscode = require('vscode');
const { ensureRqmd, runRqmd, initOutputChannel } = require('./bootstrap');

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

    console.log('rqmd extension activated');
}

function deactivate() {}

module.exports = { activate, deactivate };
