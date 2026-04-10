---
name: rqmd-status-maintenance
description: Safely update requirement statuses, priorities, and focused worklists with rqmd and rqmd-ai. Use for planned status transitions, priority triage, filter-driven maintenance, and guarded requirement doc mutations.
argument-hint: Describe the requirement IDs, desired status or priority updates, and whether you want preview-only or apply mode.
user-invocable: true
metadata:
  guide:
    summary: Preview and apply requirement metadata changes safely before mutating tracked docs.
    workflow:
      - Preview updates with rqmd-ai --update before writing.
      - Apply only once the preview matches the intended status or priority changes.
      - Re-run summary verification after requirement metadata changes.
    examples:
      - rqmd-ai --json --update RQMD-CORE-001=implemented
      - rqmd-ai --json --write --update RQMD-CORE-001=implemented
      - rqmd --update-priority RQMD-CORE-001=p1
---

Use when the task is primarily requirement metadata, not product code.

## Workflow

- **Preview:** `rqmd-ai --json --update ID=STATUS`
- **Apply:** `rqmd-ai --json --write --update ID=STATUS`
- **Priority:** `rqmd --update-priority ID=p1`
- **Filters:** `--status`, `--priority`, `--flagged`, `--has-link`, or positional tokens
- Re-run `rqmd --verify-summaries --non-interactive` after mutations

## Constraints

- Keep status/priority aligned with code and test state
- Prefer machine-readable preview/apply flows
