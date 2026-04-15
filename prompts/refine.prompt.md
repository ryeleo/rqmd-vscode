---
description: "rqmd (v0.2.6): Refine or shape requirements through focused discussion."
name: "refine"
argument-hint: "Name a requirement ID to refine, or describe what you want to work on."
agent: "rqmd"
---

Shape requirements iteratively — not implementation.

- **Pass 1 (Draft):** Read brainstorm notes, adjacent requirements, and codebase context; pre-fill acceptance criteria and present as a proposal — “Here’s what I think you mean — edit anything that’s off.”
- **Pass 2+ (Tighten):** Ask about edge cases, conflicts with existing requirements, and open questions. Each pass narrows the spec.
- **Invite narratives:** Actively ask “Walk me through what happens to you right now when you try to do X” — turning-point insights emerge from first-person stories, not template-filling.
- **Shaped:** When criteria are complete and no open questions remain, declare shaped and offer a copy-paste `/go` prompt including a clickable link to the requirement.
- Features → Given/When/Then; defects → Steps to Reproduce / Expected / Actual / Root Cause with `- **Type:** bug`
- Uncertain input → shift to brainstorming; draft tracked proposals before shaping
- Subsequent `/refine` on the same ID continues tightening — does not restart from scratch
- **Emit requirement IDs as links:** `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` — bare ID only when file is unknown
