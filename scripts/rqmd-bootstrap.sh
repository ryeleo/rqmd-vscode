#!/usr/bin/env bash
# rqmd-bootstrap.sh — shell shim entrypoint (RQMD-EXT-058, command-line fallback).
#
# Ensures rqmd (and uv if needed) is installed before exec-ing rqmd with the
# original arguments.  Mirrors the logic in bootstrap.js for terminal and CI
# contexts where the VS Code extension host is not available.
#
# Same-major version policy (RQMD-EXT-056): the first time rqmd is installed,
# the major version is persisted to XDG state.  Subsequent installs on the same
# machine stay within that major line.
#
# Concurrency lock (RQMD-EXT-059): a lockfile prevents concurrent installs from
# racing when multiple terminals start simultaneously.
#
# Usage:  rqmd-bootstrap.sh [rqmd args...]
# Or as a shell function alias:
#   rqmd() { /path/to/rqmd-bootstrap.sh "$@"; }
#
# Batch 3 will add: structured reason-code output.

set -euo pipefail

# ---------------------------------------------------------------------------
# State and lock files
# ---------------------------------------------------------------------------
STATE_DIR="${XDG_STATE_HOME:-$HOME/.local/state}/rqmd"
STATE_FILE="${STATE_DIR}/installed-major"
LOCK_FILE="${STATE_DIR}/bootstrap.lock"

# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

tool_available() {
    command -v "$1" >/dev/null 2>&1
}

get_rqmd_major() {
    rqmd --version 2>/dev/null \
        | grep -oE '[0-9]+\.[0-9]+\.[0-9]+' \
        | head -1 \
        | cut -d. -f1
}

persist_major() {
    local major="$1"
    mkdir -p "$(dirname "$STATE_FILE")"
    printf '%s' "$major" > "$STATE_FILE"
}

refresh_uv_path() {
    # Add uv tool bin dir to PATH so freshly-installed tools are findable.
    if tool_available uv; then
        local uv_bin_dir
        uv_bin_dir="$(uv tool bin-dir 2>/dev/null)" || true
        if [[ -n "$uv_bin_dir" && ":${PATH}:" != *":${uv_bin_dir}:"* ]]; then
            export PATH="${uv_bin_dir}:${PATH}"
        fi
    fi
    # Also ensure ~/.local/bin is present (default uv install location).
    local local_bin="$HOME/.local/bin"
    if [[ ":${PATH}:" != *":${local_bin}:"* ]]; then
        export PATH="${local_bin}:${PATH}"
    fi
}

# ---------------------------------------------------------------------------
# RQMD-EXT-059: Concurrency lock — wait up to 60 s for another bootstrap
# ---------------------------------------------------------------------------
mkdir -p "$STATE_DIR"
if command -v flock >/dev/null 2>&1; then
    exec 9>"$LOCK_FILE"
    flock -w 60 9 || { echo "[rqmd-bootstrap] timed out waiting for lock" >&2; exit 1; }
fi

# ---------------------------------------------------------------------------
# Main bootstrap logic
# ---------------------------------------------------------------------------

refresh_uv_path

# --- Case 1: rqmd is already present ---
if tool_available rqmd; then
    current_major="$(get_rqmd_major)"

    if [[ -f "$STATE_FILE" ]]; then
        expected_major="$(cat "$STATE_FILE")"
        if [[ "$current_major" != "$expected_major" ]]; then
            echo "Warning: Installed rqmd major ${current_major}, but this workflow expects major ${expected_major}. Please update manually." >&2
            exit 1
        fi
    else
        # First time seeing rqmd — record as the anchor major.
        persist_major "$current_major"
    fi

    exec rqmd "$@"
fi

# --- Case 2: rqmd is missing — begin bootstrap ---
echo "Installing rqmd (and uv if it is not available) so this workspace can run rqmd commands." >&2

# Install uv if missing.
if ! tool_available uv; then
    curl -LsSf https://astral.sh/uv/install.sh | sh
    export PATH="$HOME/.local/bin:$HOME/.cargo/bin:$PATH"
fi

# Determine version spec: same-major pin if we have a recorded anchor, else latest.
if [[ -f "$STATE_FILE" ]]; then
    expected_major="$(cat "$STATE_FILE")"
    version_spec="rqmd==${expected_major}.*"
else
    version_spec="rqmd"
fi

uv tool install "$version_spec"
refresh_uv_path

# Persist installed major as the anchor for future installs.
current_major="$(get_rqmd_major)"
persist_major "$current_major"

echo "rqmd is ready. Re-running your command now." >&2
exec rqmd "$@"
