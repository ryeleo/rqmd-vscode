---
name: rqmd-verify
description: Verify rqmd requirement/documentation sync and post-change validation. Use after edits to re-run summary verification, targeted tests, full tests, and any final requirement-status checks before completion.
argument-hint: Describe what changed and whether you want targeted validation, a full verification pass, or both.
user-invocable: false
metadata:
  guide:
    summary: Run the finish-pass verification loop after edits land.
    workflow:
      - Re-run summary verification first.
      - Run targeted tests for the touched area.
      - Run the full test suite before calling the batch complete.
    examples:
      - rqmd --verify-summaries --non-interactive
      - uv run --extra dev pytest tests/test_ai_cli.py -q
      - uv run --extra dev pytest -q
---

Use when changes are in progress and you need a disciplined finish pass.

## Workflow

1. `rqmd --verify-summaries --non-interactive`
2. Targeted tests for touched area
3. Full suite: `uv run --extra dev pytest -q`
4. If backlog changed, re-check `rqmd-ai --json --dump-status proposed`
5. Call out residual risk or drift before finishing

## Constraints

- Prefer deterministic validation
- Report clearly when validation incomplete
