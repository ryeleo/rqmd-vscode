const vscode = require('vscode');

function activate(context) {
    // rqmd contributes prompts, skills, and agents declaratively via package.json.

    // RQMD-PACKAGING-016: "rqmd: Initialize Project" command palette action.
    // Runs `rqmd init` in an integrated terminal so the CLI produces the AI
    // handoff prompt.  The user then pastes that output into Copilot Chat,
    // which drives the full interview flow and writes only project-specific
    // files (.github/skills/dev, .github/skills/test, starter requirement docs).
    // Shared rqmd defaults (prompts, skills, agents) stay in the extension.
    const initDisposable = vscode.commands.registerCommand('rqmd.initProject', () => {
        const workspaceFolders = vscode.workspace.workspaceFolders;
        const cwd = workspaceFolders && workspaceFolders.length > 0
            ? workspaceFolders[0].uri.fsPath
            : undefined;

        const terminal = vscode.window.createTerminal({
            name: 'rqmd init',
            cwd,
        });
        terminal.show();
        terminal.sendText('rqmd init');

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
