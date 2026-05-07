---
description: "rqmd (v0.3.0): Review the session — what got done, what drifted, what's next."
name: "retro"
argument-hint: "Run after a /go batch or work session to review drift and leave a clean handoff."
agent: "rqmd"
---

Structured post-work retrospective.

- Gather: `git status`, current diff, recent commits, `rqmd --json --non-interactive`, session file if present, and inbox count.
- Output exactly: `## What got done`, `## Drift`, `## What's next`.
- Drift signals: untracked changes, skipped refinement, scope expansion, stalled Proposed work, and deprecated-but-alive tech debt.
- Classify stalled work as deferred, blocked, cancelled, or unknown; confirm low-confidence calls before changing statuses.
- For tech debt, tag concise `[tech-debt]` inbox entries and report the count.
- Record a compressed `retro` node when session tracking exists; if absent, say drift detection used git and rqmd only.
- No changes means: "No code changes — this was a planning/shaping session."
- Multiple retros append history; do not overwrite earlier nodes.
