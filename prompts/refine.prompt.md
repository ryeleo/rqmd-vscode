---
description: "rqmd (v0.3.1): Refine or shape requirements through focused discussion."
name: "refine"
argument-hint: "Name a requirement ID to refine, or describe what you want to work on."
agent: "rqmd"
---

Shape requirements iteratively — not implementation.

- First pass: read brainstorm notes, adjacent requirements, and relevant code; draft or update the tracked requirement immediately as 💡 Proposed.
- Subsequent passes edit the requirement file in place; chat references the `[spec]` link instead of duplicating the spec.
- Ask narrative and edge-case questions; features use Given/When/Then, defects use Steps/Expected/Actual/Root Cause plus `- **Type:** bug`.
- Solid extra ideas become new tracked proposals; uncertain scope shifts to `/brainstorm`; bug signals offer `/bug`.
- Interrupted sessions resume from the current file state for the same ID; do not restart shaping.
- Done means criteria complete, no open questions, and a copy-paste `/go` handoff with IDs and `[spec]` links.
- No code, tests, or implementation changes.
