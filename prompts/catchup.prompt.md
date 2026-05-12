---
description: "rqmd (v0.3.1): Where was I? — quick orientation when returning to a project."
name: "catchup"
argument-hint: "Run when returning after an absence to see where you left off."
agent: "rqmd"
---

Re-orientation when returning to a project after an absence.

- Read the latest session file if present, `git status`, recent commits, and `rqmd --json --non-interactive`.
- Output: last session, in-progress requirements, uncommitted changes, inbox count, and top 3 suggested next actions.
- Suggested actions follow session continuity and blockers first; use priority only as a tiebreaker.
- If no session file exists, orient from git and backlog and say session tracking is absent.
- If session tracking exists, write a concise `catchup` node starting the new session.
- Clean tree plus empty backlog means: "Nothing in-flight — ready for a fresh `/brainstorm` or `/triage`."
- If the agent detects a long absence, it may suggest `/catchup` proactively.
