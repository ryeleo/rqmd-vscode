---
description: "rqmd (v0.2.9): Review the session — what got done, what drifted, what's next."
name: "retro"
argument-hint: "Run after a /go batch or work session to review drift and leave a clean handoff."
agent: "rqmd"
---

Structured post-work retrospective.

## Data gathering

1. `git diff --stat` (uncommitted) + `git log --oneline --since=<session-start>` (commits this session)
2. `rqmd --json --non-interactive` for current requirement statuses
3. Session tree in `docs/sessions/` for intended work scope (if present)

## Drift categories

- **Untracked changes** (⚠️ informational): Files in `git diff` with no requirement link. Flag factually; dev decides.
- **Skipped refinement** (⚠️ informational): Requirement went 💡→🔧 with no `/refine` session node. Not always wrong but the pattern should be visible.
- **Scope expansion** (📋 neutral): Requirements touched that weren't in the original `/go` slice. Report factually without judgment.
- **Stalled work** (🔍 classify + confirm): A requirement named in an `implementation` node is still 💡 Proposed. Classify with best guess, then confirm:
  - **Deferred:** pivoted to higher-priority work
  - **Blocked:** hit a dependency
  - **Cancelled:** decided not to do it
  - **Unknown:** ask: "You started EXT-NNN but it's still 💡. Looks deferred — sound right?"
- **Tech debt accrual** (🧹 actionable): Deprecated requirements still referenced by active code, dead modules kept alive, or infrastructure that no longer serves a tracked requirement. Detected via `rqmd --staleness --deprecated-only` (when available) or by scanning for 🗑️ Deprecated IDs with live callers. Tag each item `[tech-debt]` and append to `docs/inbox.md` for the next `/tech-debt-sweep` to pick up. Include a debt count in the retro summary: `> 🧹 Tech debt: N items tagged [tech-debt] → inbox`

## Classification protocol

- Make a first-pass classification from session tree, conversation context, and statuses
- Present with confidence signal: "EXT-075 looks **deferred** — you pivoted to EXT-074 mid-session. Sound right?"
- Only ask open-ended "what happened?" when genuinely unsure
- Act on confirmed classifications: mark ⛔ Blocked, 🗑️ Deprecated, or leave as 💡 deferred

## Output format

- `## What got done` — requirements completed with linked IDs

- `## Drift` — categorized drift items with severity emoji

- `## What's next` — suggested next actions (top 3)

- Stalled items: agent's classification + confirm prompt

## Session tree integration

- Write a `retro` node to the current session file in `docs/sessions/`
- Node body contains compressed retro summary (full output goes to chat)
- If no session file exists, create one (slug: `retro`)
- Notify: `> 📝 Recorded session node: "session retro" (retro)`

## Inbox awareness

- If `docs/inbox.md` has items, report: "You have N un-triaged Inbox items"

## Edge cases

- **No git changes:** still run against session tree + statuses. Output: "No code changes — this was a planning/shaping session."
- **No session tree file:** graceful degradation — drift detection uses only git + statuses, note session tracking wasn't active.
- **Multiple `/retro` per session:** each writes a new `retro` node; earlier retros preserved as history.
