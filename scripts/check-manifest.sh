#!/usr/bin/env bash
set -euo pipefail
# Verify that every prompt file and every skill SKILL.md on disk is listed
# in package.json under chatPromptFiles / chatSkills.
# Exits non-zero and prints missing entries if any are found.
# Usage: ./scripts/check-manifest.sh

SCRIPT_DIR="$(CDPATH= cd -- "$(dirname -- "$0")" && pwd)"
REPO_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"
MANIFEST="$REPO_ROOT/package.json"

errors=0

# ── Prompts ──────────────────────────────────────────────────────────────────
while IFS= read -r -d '' f; do
  rel="./prompts/$(basename "$f")"
  if ! grep -qF "\"$rel\"" "$MANIFEST"; then
    echo "MISSING from chatPromptFiles: $rel"
    errors=$((errors + 1))
  fi
done < <(find "$REPO_ROOT/prompts" -maxdepth 1 -name '*.prompt.md' -print0 | sort -z)

# ── Skills ────────────────────────────────────────────────────────────────────
while IFS= read -r -d '' f; do
  rel="./skills/$(basename "$(dirname "$f")")/SKILL.md"
  if ! grep -qF "\"$rel\"" "$MANIFEST"; then
    echo "MISSING from chatSkills: $rel"
    errors=$((errors + 1))
  fi
done < <(find "$REPO_ROOT/skills" -maxdepth 2 -name 'SKILL.md' -print0 | sort -z)

# ── Stale manifest entries ────────────────────────────────────────────────────
while IFS= read -r path; do
  full="$REPO_ROOT/$path"
  # strip leading ./
  full="$REPO_ROOT/${path#./}"
  if [[ ! -f "$full" ]]; then
    echo "STALE in manifest (file not found): $path"
    errors=$((errors + 1))
  fi
done < <(grep -oE '"path": *"\./[^"]+"' "$MANIFEST" | sed 's/.*"\(\.\/[^"]*\)".*/\1/')

if [[ $errors -eq 0 ]]; then
  prompt_count=$(find "$REPO_ROOT/prompts" -maxdepth 1 -name '*.prompt.md' | wc -l | tr -d ' ')
  skill_count=$(find "$REPO_ROOT/skills" -maxdepth 2 -name 'SKILL.md' | wc -l | tr -d ' ')
  echo "✓ manifest OK — ${prompt_count} prompt(s), ${skill_count} skill(s) all registered"
  exit 0
else
  echo ""
  echo "$errors problem(s) found. Update package.json to fix."
  exit 1
fi
