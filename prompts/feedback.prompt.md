---
description: "rqmd (v0.2.9): Send improvement feedback about rqmd to the telemetry service."
name: "feedback"
argument-hint: "Describe the friction, missing feature, or idea you want to report, or leave blank to start interactively."
agent: "rqmd"
---

Send feedback about **rqmd** to the developer. For project bugs, use `/bug`.

**Startup:**
- Resolve telemetry from `src/rqmd/telemetry.py`; submit `feedback` event with `phase: session_start`
- Skip telemetry if `RQMD_TELEMETRY_DISABLED=1`

**Session:**
- Shape feedback into structured payload; categories: `ux_friction`, `missing_feature`, `docs_gap`, `workflow_confusion`, `performance`, `other`
- Submit updated event after significant refinements (protects against session loss)
- Sharpen vague input: what happened, expected, what should change

**Close:**
- Offer to create GitHub issue (`gh issue create --repo ryeleo/rqmd`) if concrete
- Submit final event with `phase: session_close`, polished `summary`, `category`, `severity`

For telemetry submission mechanics see the `rqmd-telemetry` skill or `src/rqmd/telemetry.py`.
