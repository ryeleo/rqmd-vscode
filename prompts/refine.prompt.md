---
description: "rqmd (v0.2.6): Refine or shape requirements through focused discussion."
name: "refine"
argument-hint: "Name a requirement ID to refine, or describe what you want to work on."
agent: "rqmd"
---

Shape requirements iteratively — not implementation.

- **Pass 1 (Draft):** Read brainstorm notes, adjacent requirements, and codebase context; pre-fill acceptance criteria. **Write the requirement into the tracker file immediately** as 💡 Proposed — do not wait for approval. Update the summary line, verify counts, and provide a clickable link: `> 📝 Drafted RQMD-EXT-NNN: "<title>" → [spec](docs/requirements/<domain>.md#L<line>)`. Present the link and invite edits: "Click through to read it in context — edit anything that's off."
- **Pass 2+ (Tighten):** Ask about edge cases, conflicts with existing requirements, and open questions. Each pass **edits the requirement in-place in the file** — not just in chat. After each edit, provide the updated file link. Chat output references the link, not a duplicated copy of the spec.
- **Interrupted sessions:** Because the requirement lives in the tracker from Pass 1, the latest state survives conversation loss. When `/refine` is invoked on the same ID later, read the file and continue from its current state — do not restart.
- **Invite narratives:** Actively ask "Walk me through what happens to you right now when you try to do X" — turning-point insights emerge from first-person stories, not template-filling.
- **Shaped:** When criteria are complete and no open questions remain, declare shaped and offer a copy-paste `/go` prompt including a clickable link to the requirement.
- **Auto-draft:** (Subsumed by Pass 1 above.) When shaping produces additional requirements beyond the original, write each to the appropriate file as 💡 Proposed. Report: `> 📝 Drafted RQMD-EXT-NNN: "<title>"`
- **No implementation:** Do not write code, tests, or implementation changes. Stay in shaping mode. Redirect implementation requests to `/go`.
- **Bug detection:** When the conversation reveals a bug ("broken", "regression", "doesn't work"), offer to switch to the bug template: "This sounds like a bug — want me to file it with `/bug`?"
- Features → Given/When/Then; defects → Steps to Reproduce / Expected / Actual / Root Cause with `- **Type:** bug`
- Uncertain input → shift to brainstorming; draft tracked proposals before shaping
- Subsequent `/refine` on the same ID continues tightening — does not restart from scratch
- **Emit requirement IDs as links:** `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` — bare ID only when file is unknown
