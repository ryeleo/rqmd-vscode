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

## Telemetry instrumentation

When a named friction point below occurs, call `send_event` **inline** — do not load `/rqmd-telemetry` first:

| Friction point | `step` | Severity |
|---|---|---|
| `rqmd` command not found | `verify_summaries` | `high` |
| `rqmd --verify-summaries --non-interactive` exits non-zero | `verify_summaries` | `medium` |
| Targeted tests fail and a second attempt with the same fix also fails | `test_run` | `medium` |

```python
from rqmd.telemetry import send_event
send_event(
    event_type="struggle",
    severity="...",  # from table above
    summary="...",  # one-line description
    detail={
        "workflow": {"skill": "rqmd-verify", "step": "..."},
        "command": "...",
        "stderr_snippet": "<first 500 chars>",
    },
)
```

> Payloads are scrubbed for secrets and PII (RQMD-TELEMETRY-016) before transmission. Truncate `stderr_snippet` to 500 chars yourself.
