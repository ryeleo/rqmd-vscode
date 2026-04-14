---
name: rqmd-verify
description: Run post-change validation — summaries, targeted tests, full tests, and residual risk.
argument-hint: Describe what changed and whether you want targeted or full verification.
user-invocable: false
metadata:
  guide:
    summary: Disciplined finish-pass verification after edits land.
---

Run the verification loop after changes land. Catch drift between code, requirement docs, and summaries before declaring a batch done.

## Done when

- `rqmd --verify-summaries --non-interactive` passes
- Targeted tests for touched area pass
- Full test suite passes (use project `/test` skill for repo-specific commands)
- Residual risk or remaining drift explicitly called out

## Edge cases

- Don't hardcode test commands — delegate to the project's `/test` skill
- If backlog changed, re-check proposal priorities before handing off
