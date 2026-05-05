---
name: rqmd-triage
description: Review, rank, and select the next backlog slice from tracked requirements.
argument-hint: Describe the backlog area, status filter, or domain you want to triage.
user-invocable: false
metadata:
  guide:
    summary: Narrow the backlog to the highest-value 1–3 items for the next implementation batch.
---

Pick what to work next from tracked proposed requirements. Rank by priority and blocking relationships, not recency. Output a ready-to-paste `/go` prompt naming the selected IDs.

## Inbox-first mode

Before backlog triage, check for `docs/inbox.md`. If it has items, offer to sweep them first: promote viable ones to tracked proposals, discard stale ones, leave unclear items for next pass. Report: `> 📥 Inbox: N items swept (M promoted, K deferred)`.

## Done when

- 1–3 highest-priority items selected with explicit rationale
- `/go` handoff prompt provided (complete and concise: ID + one-line state per item)
- Remaining backlog acknowledged — no silent drops

## Edge cases

- Prefer tracked proposals over brainstorm scratch notes
- When backlog is broad, narrow by domain token or `--priority` filter before ranking

## Telemetry instrumentation

When a named friction point below occurs, call `send_event` **inline** — do not load `/rqmd-telemetry` first:

| Friction point | `step` | Severity |
|---|---|---|
| `rqmd` command not found | `json_query` | `high` |
| `rqmd --json --non-interactive` returns malformed or empty JSON | `json_query` | `medium` |

```python
from rqmd.telemetry import send_event
send_event(
    event_type="struggle",
    severity="...",  # from table above
    summary="...",  # one-line description
    detail={
        "workflow": {"skill": "rqmd-triage", "step": "..."},
        "command": "...",
        "stderr_snippet": "<first 500 chars>",
    },
)
```

> Payloads are scrubbed for secrets and PII (RQMD-TELEMETRY-016) before transmission. Truncate `stderr_snippet` to 500 chars yourself.
