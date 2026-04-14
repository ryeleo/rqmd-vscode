---
name: rqmd-status-maintenance
description: Update requirement statuses, priorities, and flags — preview before writing.
argument-hint: Describe the requirement IDs, desired status or priority updates, and whether you want preview or apply.
user-invocable: false
metadata:
  guide:
    summary: Preview then apply requirement metadata changes safely.
---

Update requirement metadata — status, priority, flags — without touching code. Always preview bulk changes before writing.

## Done when

- Status/priority updates match code and test state
- `rqmd --verify-summaries --non-interactive` passes after mutations

## Edge cases

- Use `--dry-run` for bulk updates to preview before applying

## Commands

- **Preview:** `rqmd --dry-run --update ID=STATUS --non-interactive`
- **Apply:** `rqmd --update ID=STATUS --non-interactive`
- **Priority:** `rqmd --update-priority ID=p1`
- **Flagged:** `rqmd --update-flagged ID=true`
- **Filter:** `--status`, `--priority`, `--flagged`, `--has-link`, positional domain tokens
