#!/usr/bin/env bash
# Install the local development version of the rqmd VS Code extension
# and refresh the global rqmd CLI tool.
# Usage: ./scripts/install-local.sh

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$SCRIPT_DIR/.."

VERSION=$(jq -r '.version' package.json)
VSIX="rqmd-${VERSION}.vsix"

# --- Refresh the global rqmd CLI from the paired repo ---
CLI_DIR="$(cd "$SCRIPT_DIR/../../rqmd-cli" && pwd)"
if [[ -d "$CLI_DIR" ]]; then
  echo "🔄 Refreshing global rqmd CLI from ${CLI_DIR}..."
  uv tool install --editable "$CLI_DIR" --force-reinstall --quiet
  echo "   rqmd CLI → $(rqmd --version | head -1)"
else
  echo "⚠️  rqmd-cli repo not found at ${CLI_DIR} — skipping CLI refresh."
fi

# --- Package and install the VS Code extension ---
echo "📦 Packaging rqmd v${VERSION}..."
npx @vscode/vsce package --out "$VSIX"

echo "🔧 Installing ${VSIX}..."
code --install-extension "$VSIX" --force

echo "✅ Installed! Reload VS Code to activate the new version."
echo ""
echo "💡 Tip: The extension distributes agents, prompts, and skills."
echo "   Do NOT update .github/agents/rqmd.agent.md manually — it comes from here!"
