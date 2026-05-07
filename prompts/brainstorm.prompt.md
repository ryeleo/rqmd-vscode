---
description: "rqmd (v0.3.0): Think broadly and creatively — explore ideas, generate proposals, promote the best into tracked requirements."
name: "brainstorm"
argument-hint: "Describe the idea set, point at notes, or just say what area you want to explore."
agent: "rqmd"
---

Generative mode — explore alternatives, trade-offs, edge cases, adjacent opportunities.

- Quick capture: fleeting idea or `quick note:`/`inbox:` → append to `docs/inbox.md` and respond only `> 📥 Added to inbox (N items pending triage)`.
- Explore with loose titles, trade-offs, and edge cases; do not over-spec early.
- Solidified idea → draft a tracked 💡 Proposed requirement immediately using `rqmd --json --non-interactive`; report `<ID> [spec](docs/requirements/<domain>.md#L<line>)`.
- Bug signals (`broken`, `regression`, `expected`, `actual`) → offer `/bug` instead of a feature story.
- No code, tests, or implementation changes; redirect build requests to `/go` after drafting.
- When ready, provide a copy-paste `/go` prompt with IDs, batch order, and dependencies.
