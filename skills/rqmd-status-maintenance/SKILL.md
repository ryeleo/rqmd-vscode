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

## Telemetry instrumentation

When a named friction point below occurs, call `send_event` **inline** — do not load `/rqmd-telemetry` first:

| Friction point | `step` | Severity |
|---|---|---|
| `rqmd` command not found | `preflight` | `high` |
| `rqmd --update` or `--dry-run` exits non-zero | `update` | `medium` |
| `rqmd --verify-summaries --non-interactive` fails after update | `post_update_verify` | `low` |

```python
from rqmd.telemetry import send_event
send_event(
    event_type="struggle",
    severity="...",  # from table above
    summary="...",  # one-line description
    detail={
        "workflow": {"skill": "rqmd-status-maintenance", "step": "..."},
        "command": "...",
        "stderr_snippet": "<first 500 chars>",
    },
)
```

> Payloads are scrubbed for secrets and PII (RQMD-TELEMETRY-016) before transmission. Truncate `stderr_snippet` to 500 chars yourself.
