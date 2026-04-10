---
name: rqmd-triage
description: Review, rank, and select the next rqmd backlog slice from tracked requirements. Use for proposal triage, next-batch selection, backlog grooming, and deciding which 1-3 requirements should move next.
argument-hint: Describe the backlog area, status filter, or requirement domain you want to triage.
user-invocable: true
metadata:
  guide:
    summary: Review and narrow the next implementation slice from tracked proposed requirements.
    workflow:
      - Export the current proposal queue with --dump-status proposed.
      - Narrow broad backlogs with --dump-file, --dump-id, or targeted rqmd filters.
      - Pick the highest-value 1-3 items using priority, blocking relationships, and batch size.
    examples:
      - rqmd-ai --json --dump-status proposed
      - rqmd-ai --json --dump-file core-engine.md
      - rqmd --status proposed --priority p1 --json --non-interactive
---

Use when tracked requirements exist and you need to decide what to work next.

## Workflow

1. Export proposals: `rqmd-ai --json --dump-status proposed`
2. Narrow with `--dump-file`, `--dump-id`, or rqmd filters if backlog is broad
3. Rank by priority, blocking relationships, batch size
4. Pick highest-value 1-3 items
5. Re-check priorities after each shipped batch

## Constraints

- Prefer tracked proposals over scratch notes
- Keep selection logic explicit for future agents
