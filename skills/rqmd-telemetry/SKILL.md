---
name: rqmd-telemetry
description: Report AI workflow friction, improvement suggestions, and session diagnostics to the rqmd telemetry service. Use when an rqmd command fails unexpectedly, when workflow guidance is confusing, or when you notice something that could be improved.
argument-hint: Describe the friction, failure, or improvement idea you want to report.
user-invocable: false
metadata:
  guide:
    summary: Submit structured telemetry events so rqmd developers can see where AI agents struggle and what they think could be better.

---

Report AI workflow friction, suggestions, and errors to the rqmd telemetry service.

> **⚠️ Note:** This skill reports issues with **rqmd itself**. For your own project bugs, use `/bug` instead.

## Configuration

**Enabled by default** — built-in production endpoint with automatic token exchange.

- **Endpoint resolution:** `RQMD_TELEMETRY_ENDPOINT` env → `telemetry.endpoint` in config → built-in default
- **Auth:** `RQMD_TELEMETRY_API_KEY` env → config → automatic token exchange
- **Opt out:** `RQMD_TELEMETRY_DISABLED=1`

## When to report

| Event type | When to use |
|---|---|
| `struggle` | Command fails, retry needed, guidance confusing, JSON malformed |
| `struggle` (high, `category: command_discovery`) | CLI not found, tried multiple invocation variants, fell back to file edits |
| `suggestion` | Friction not a failure, workflow could be more intuitive, new skill/prompt idea |
| `error` | Python traceback, command hang/timeout |

## How to report

```python
from rqmd.telemetry import send_event

send_event(
    event_type="struggle",
    severity="high",
    summary="rqmd --verify-summaries exited non-zero",
    agent_name="rqmd",
    model_id="claude-sonnet-4-5",  # populate from your system prompt or model context
    detail={
        "command": "rqmd --verify-summaries -y",
        "expected": "Exit 0",
        "actual": "Exit 1 with summary mismatch",
        "stderr_snippet": "...",
    },
)
```

### Command discovery struggles (always high severity)

```python
send_event(
    event_type="struggle",
    severity="high",
    summary="Could not invoke rqmd; fell back to file edits",
    detail={
        "category": "command_discovery",
        "commands_attempted": ["rqmd --json -y", "uv run rqmd --json -y"],
        "fallback_action": "Edited docs/requirements directly",
        "stderr_snippet": "command not found: rqmd",
    },
)
```

## Event field reference

| Field | Required | Description |
|---|---|---|
| `session_id` | yes | UUID per chat session or agent run |
| `agent_name` | no | e.g. `rqmd` |
| `event_type` | yes | `struggle` / `suggestion` / `error` / `success` / `workflow_step` / `feedback` |
| `severity` | yes | `low` / `medium` / `high` / `critical` |
| `summary` | yes | One-line, <200 chars |
| `model_id` | no | AI model identifier — populate from your own system prompt or VS Code model context (e.g. `"claude-sonnet-4-5"`, `"gpt-4o"`). Omit or leave null when not available; never fabricate. |
| `detail` | no | Structured context (command, expected, actual, stderr_snippet, etc.) |

## HTTP reference

```
POST {endpoint}/api/v1/events
Authorization: Bearer <token>
Content-Type: application/json
```

## Test pipeline

```python
from rqmd.telemetry import send_event
send_event(event_type="struggle", severity="low", summary="telemetry pipeline test")
```

## Constraints

- **Never include secrets, tokens, or sensitive file contents**
- Truncate stderr/stdout to 2000 chars
- Prefer structured `detail` over raw text in `summary`
- One event per observed issue. Do not batch multiple unrelated issues into a single event.
- Skills improve workflow discovery; shell and tool approvals may still be required.
