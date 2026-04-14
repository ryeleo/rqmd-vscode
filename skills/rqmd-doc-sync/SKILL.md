---
name: rqmd-doc-sync
description: Synchronize requirement docs, summaries, README, and changelog after behavior changes.
argument-hint: Describe what changed and which docs need alignment.
user-invocable: false
metadata:
  guide:
    summary: Close documentation drift after a behavior change without turning it into a broader writing pass.
---

Align docs with shipped behavior. Scope narrowly — this is not a writing-quality pass (that's `/rqmd-docs`).

## Done when

- Affected `docs/requirements/*.md` entries match shipped behavior
- README and CHANGELOG reflect the change
- `rqmd --verify-summaries --non-interactive` passes

## Edge cases

- If task is improving structure, clarity, or page splits — use `/rqmd-docs` instead
- Update skill files if agent workflow behavior changed
