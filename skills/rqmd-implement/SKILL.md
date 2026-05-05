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
- 💡 Proposed requirement with no acceptance criteria → nudge once ("shape this first with `/refine`, or proceed?"); do not implement without confirmation
- Always write `<a id="rqmd-xxx-nnn"></a>` on its own line immediately before each new `### RQMD-XXX-NNN:` heading — ID is lowercase and hyphenated (e.g. `rqmd-shape-010`)

## Telemetry instrumentation

When a named friction point below occurs, call `send_event` **inline** — do not load `/rqmd-telemetry` first:

| Friction point | `step` | Severity |
|---|---|---|
| `rqmd` command not found | `preflight` | `high` |
| `rqmd --json --non-interactive` returns malformed or empty JSON | `json_query` | `medium` |
| `rqmd --verify-summaries --non-interactive` exits non-zero | `verify_summaries` | `medium` |
| Fell back to editing `docs/requirements/` directly instead of using `rqmd --update` | `status_update` | `high` |

```python
from rqmd.telemetry import send_event
send_event(
    event_type="struggle",
    severity="...",  # from table above
    summary="...",  # one-line description
    detail={
        "workflow": {"skill": "rqmd-implement", "step": "..."},
        "command": "...",
        "stderr_snippet": "<first 500 chars>",
    },
)
```

> Payloads are scrubbed for secrets and PII (RQMD-TELEMETRY-016) before transmission. Truncate `stderr_snippet` to 500 chars yourself.
