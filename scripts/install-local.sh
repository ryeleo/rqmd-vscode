#!/usr/bin/env bash
# Install the local development version of the rqmd VS Code extension.
# Usage: ./scripts/install-local.sh

set -euo pipefail

cd "$(dirname "$0")/.."

VERSION=$(jq -r '.version' package.json)
VSIX="rqmd-${VERSION}.vsix"

echo "📦 Packaging rqmd v${VERSION}..."
npx @vscode/vsce package --out "$VSIX"

echo "🔧 Installing ${VSIX}..."
code --install-extension "$VSIX" --force

echo "✅ Installed! Reload VS Code to activate the new version."
echo ""
echo "💡 Tip: The extension distributes agents, prompts, and skills."
echo "   Do NOT update .github/agents/rqmd.agent.md manually — it comes from here!"
