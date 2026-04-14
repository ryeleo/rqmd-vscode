---
name: rqmd-implement
description: Implement the highest-priority proposed requirements in small validated batches.
argument-hint: Describe the requirement IDs or behavior to implement and the expected validation scope.
user-invocable: false
metadata:
  guide:
    summary: Work highest-priority proposed requirements in small validated batches.
---

Move proposed requirements to implemented. Work 1–3 items per batch, updating requirement docs, tests, and CHANGELOG as details become concrete — not deferred to the end.

## Done when

- Requirement status updated to 🔧 Implemented
- `rqmd --verify-summaries --non-interactive` passes
- Tests pass (targeted, then full suite via project `/test` skill)
- CHANGELOG updated under `[Unreleased]`

## Edge cases

- Never invent IDs — use `next_id` from `rqmd --json` output
- Max 3 items per batch; re-check priorities before taking another
- Prefer user-story + Given/When/Then when both clarify the behavior
