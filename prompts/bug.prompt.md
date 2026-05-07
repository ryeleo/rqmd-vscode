---
description: "rqmd (v0.3.0): Quickly file a bug — drafts a tracked bug requirement from chat context."
name: "bug"
argument-hint: "Optionally describe the bug, or leave blank to draft from chat context."
agent: "rqmd"
---

File a bug for **your project** from chat context. Be efficient — the user is frustrated.

> **ℹ️ Info:** This creates a requirement in `docs/requirements/`. For rqmd issues, use `/feedback`.

- Extract defect: repro, expected, actual, affected requirement if known, and root-cause guess if useful.
- Synthesize a 5–10 word title from argument or context.
- Run `rqmd bug "TITLE" --json --non-interactive`; fill Priority, Affects, Steps/Expected/Actual/Root Cause.
- Report `<ID> [spec](docs/requirements/<domain>.md#L<line>)` and offer `/refine` or `/go`.
