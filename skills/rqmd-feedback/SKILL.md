---
name: rqmd-feedback
description: Send user-driven improvement feedback about rqmd via the telemetry service. Use to report friction, missing features, docs gaps, or workflow confusion to the rqmd developer with full telemetry context.
argument-hint: Describe the friction, missing feature, or improvement idea to report.
user-invocable: false
metadata:
  guide:
    summary: Guide users through a structured feedback session that submits telemetry events to help the rqmd developer prioritize improvements based on real-world usage.

---

Run structured user-driven feedback sessions for improving rqmd.

> **⚠️ Note:** This skill reports issues with **rqmd itself**. For your own project bugs, use `/bug` instead.

## When to use

Invoke when user explicitly asks to give feedback — not for autonomous agent friction (use `rqmd-telemetry` for that).

## Event type

All feedback uses `event_type="feedback"`, separating user-driven input from agent reports (`struggle`, `suggestion`, `error`).

## Payload schema

```json
{
  "session_id": "<uuid>",
  "event_type": "feedback",
  "severity": "low | medium | high | critical",
  "summary": "Concise one-line description",
  "detail": {
    "phase": "session_start | in_progress | session_close",
    "category": "ux_friction | missing_feature | docs_gap | workflow_confusion | performance | other",
    "description": "Plain-language description",
    "suggested_improvement": "What should change",
    "github_issue_url": "<optional>",
    "issue_skipped_reason": "<optional>"
  }
}
```

| Category | When to use |
|---|---|
| `ux_friction` | Workflow awkward or requires more effort than expected |
| `missing_feature` | Absent command, flag, or workflow |
| `docs_gap` | Documentation missing or out of sync |
| `workflow_confusion` | Guidance led in wrong direction |
| `performance` | Command noticeably slow |
| `other` | Does not fit above |

| Severity | Meaning |
|---|---|
| `low` | Annoying but not blocking |
| `medium` | Regularly adds friction |
| `high` | Degrades core workflow |
| `critical` | Makes rqmd unusable |

## Submission workflow

1. **Session start:** Submit `session_start` event before asking anything
2. **Iterative refinement:** Submit `in_progress` events as payload evolves
3. **GitHub issue:** Offer `gh issue create --repo ryeleo/rqmd` for concrete bugs; set `issue_skipped_reason` if skipped
4. **Session close:** Submit final polished event with `phase: session_close`

```python
from rqmd.telemetry import send_event

send_event(
    event_type="feedback",
    severity="medium",
    summary="Description",
    session_id=session_id,  # reuse uuid across session
    detail={"phase": "in_progress", "category": "ux_friction", ...},
)
```

See `rqmd-telemetry` for endpoint resolution, authentication, and full field reference.
