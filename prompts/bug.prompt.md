---
description: "Quickly file a bug from the current chat context — drafts a tracked bug requirement from the conversation so a frustrated user can just type /bug and move on."
name: "bug"
argument-hint: "Optionally describe the bug, or leave blank to draft from chat context."
agent: "rqmd"
---

File a bug for **your project** from chat context. Be efficient — the user is frustrated.

> **ℹ️ Info:** This creates a requirement in `docs/requirements/`. For rqmd issues, use `/feedback`.

1. Identify defect from conversation (broken, expected, actual, repro steps)
2. Synthesize title (5-10 words) from argument or context
3. Run `rqmd bug "TITLE" --json` → creates skeleton, returns `id`, `file`, `line`
4. Fill in details via edit (Priority P1-P3, Affects, Steps/Expected/Actual/Root Cause)
5. Report filed ID + link; offer `/refine` or `/go` for next steps
