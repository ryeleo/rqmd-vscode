---
description: "rqmd (v0.2.8): Where was I? — quick orientation when returning to a project."
name: "catchup"
argument-hint: "Run when returning after an absence to see where you left off."
agent: "rqmd"
---

Re-orientation when returning to a project after an absence.

## Data gathering

1. Most recent session file from `docs/sessions/` (if present)
2. `git status` for uncommitted changes
3. `rqmd --json --non-interactive` for backlog summary

## Output

- **Last session:** retro summary from previous session (if it exists)
- **In-progress:** requirements currently 🔧 Implemented but not yet ✅ Verified
- **Uncommitted changes:** files in `git status` that haven't been committed
- **Suggested next actions:** top 3, based on priority and blocking relationships

## Inbox awareness

- If `docs/inbox.md` has items, report: "You have N un-triaged Inbox items"

## Session tree integration

- Write a `catchup` node to start the new session file in `docs/sessions/`
- If no `docs/sessions/` directory exists, note that session tracking isn't set up

## Edge cases

- **No previous session file:** skip "last session" section; orient from git log + backlog only
- **Clean working tree + empty backlog:** "Nothing in-flight — ready for a fresh `/brainstorm` or `/triage`"
- **Agent-initiated:** if the agent detects a prolonged absence (e.g. no commits for 24h+), it may suggest `/catchup` proactively
