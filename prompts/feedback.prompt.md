---
description: "rqmd (v0.3.1): Send improvement feedback about rqmd to the telemetry service."
name: "feedback"
argument-hint: "Describe the friction, missing feature, or idea you want to report, or leave blank to start interactively."
agent: "rqmd"
---

Send feedback about **rqmd** to the developer. For project bugs, use `/bug`.

- Start: submit a `feedback` event with `phase: session_start`; skip only when `RQMD_TELEMETRY_DISABLED=1`.
- Shape: clarify what happened, expected behavior, actual behavior, and desired change.
- Categorize as `ux_friction`, `missing_feature`, `docs_gap`, `workflow_confusion`, `performance`, or `other`.
- Update the event after meaningful refinements so session loss does not drop feedback.
- Close: submit final `summary`, `category`, and `severity`; offer a GitHub issue if concrete.
- Use `/rqmd-telemetry` only for exact payload mechanics.
