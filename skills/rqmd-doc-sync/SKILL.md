---
name: rqmd-doc-sync
description: Synchronize rqmd requirement docs, summaries, README guidance, and changelog entries after behavior changes. Use when shipped behavior is already understood and the main task is to close documentation drift.
argument-hint: Describe what changed and which docs or requirement files need alignment.
user-invocable: false
metadata:
  guide:
    summary: Close documentation drift after a behavior change without turning the task into a broader writing or restructure pass.
    workflow:
      - Update the affected requirement docs first.
      - Keep README, changelog, and bundle guidance aligned with the shipped behavior.
      - Hand broader readability, structure, or page-splitting work to `/rqmd-docs` when needed.
      - Re-run summary verification before finishing.
    examples:
      - rqmd --verify-summaries --non-interactive
      - rqmd-ai --json --dump-id RQMD-CORE-001 --include-requirement-body
      - rqmd-ai --json --workflow-mode implement
---

Use when code changes are done and the main task is alignment, not documentation craft.

## Workflow

1. Update affected `docs/requirements/*.md`
2. Align `docs/requirements/README.md`, top-level `README.md`, and `CHANGELOG.md`
3. Use `/rqmd-docs` instead when the task is improving structure, headings, or page splits
4. Update `.github/copilot-instructions.md` and bundle text if AI workflows changed
5. Verify: `rqmd --verify-summaries --non-interactive`
6. Call out remaining drift needing manual judgment

## Constraints

- Treat requirement markdown as product surface
- Prefer small doc updates tied to shipped behavior
