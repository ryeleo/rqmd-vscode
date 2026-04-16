#!/usr/bin/env bash
set -euo pipefail
# Stamp every rqmd prompt description with the current package version.
# Usage: ./scripts/bump-prompt-versions.sh          (reads version from package.json)
#        ./scripts/bump-prompt-versions.sh 0.2.8    (explicit version)

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
PROMPTS_DIR="$REPO_ROOT/prompts"

if [[ $# -ge 1 ]]; then
  VERSION="$1"
else
  VERSION="$(grep '"version"' "$REPO_ROOT/package.json" | head -1 | sed 's/.*"version": *"\([^"]*\)".*/\1/')"
fi

if [[ -z "$VERSION" ]]; then
  echo "error: could not determine version" >&2
  exit 1
fi

changed=0
for f in "$PROMPTS_DIR"/*.prompt.md; do
  if sed -i '' "s/rqmd (v[0-9][0-9]*\.[0-9][0-9]*\.[0-9][0-9]*)/rqmd (v${VERSION})/g" "$f" 2>/dev/null; then
    changed=$((changed + 1))
  fi
done

echo "bumped $changed prompt(s) to v${VERSION}"
