---
name: rqmd-implement
description: Implement the highest-priority proposed rqmd requirements in small validated batches. Use for multi-file code changes that must stay synchronized with docs/requirements, README, tests, and CHANGELOG entries.
argument-hint: Describe the requirement IDs or behavior to implement and the expected validation scope.
user-invocable: false
metadata:
  guide:
    summary: Work highest-priority proposed requirements in small validated batches.
    workflow:
      - Start by reviewing proposed requirements and choose the highest-priority 1-3 items for the next batch.
      - When refining requirement text, prefer a short user-story block plus Given/When/Then acceptance bullets when both clarify the behavior, and keep those two views aligned.
      - Update requirements, tests, and CHANGELOG entries as implementation details become concrete instead of deferring doc updates until the end.
      - Before taking the next batch, verify rqmd still runs, verify summaries, run the test suite, and re-check remaining proposal priorities.
    examples:
      - rqmd-ai --json --workflow-mode implement
      - rqmd-ai --json --dump-status proposed
      - rqmd --verify-summaries --non-interactive
      - uv run --extra dev pytest -q
    batch_policy:
      max_items: 3
      selection_order: highest-priority proposed first
    validation_checks:
      - rqmd runs without startup errors
      - requirement summaries verify cleanly
      - full test suite passes
      - remaining proposal priorities are reviewed before continuing
---

Use when a requirement is ready to move from proposal to implementation.

## Workflow

1. Start: `rqmd-ai --json --workflow-mode implement`
2. Review proposals: `rqmd-ai --json --dump-status proposed`
3. Take highest-priority 1-3 items for the batch
4. **Use `next_id` from JSON output** for new IDs — never calculate manually
5. Add/refresh user story + Given/When/Then when it improves clarity
6. Update requirement docs, tests, README, and `CHANGELOG.md` as details emerge
7. Verify: `rqmd --verify-summaries --non-interactive`, targeted tests, then `uv run --extra dev pytest -q`

## Constraints

- Keep changes focused; avoid unrelated refactors
- Re-check priorities before starting another batch
