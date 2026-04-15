---
description: "rqmd (v0.2.6): Think broadly and creatively — explore ideas, generate proposals, promote the best into tracked requirements."
name: "brainstorm"
argument-hint: "Describe the idea set, point at notes, or just say what area you want to explore."
agent: "rqmd"
---

Generative mode — explore alternatives, trade-offs, edge cases, adjacent opportunities.

- **Quick capture:** When the input is short (single sentence, starts with "quick note:", "inbox:", or is clearly a fleeting idea), append a `- <text>` line to `docs/inbox.md` (create with `# Inbox\n\n` header if absent) and respond only: `> 📥 Added to inbox (N items pending triage)` — do not run a full brainstorm
- Offer loose requirement titles, not full specs — keep it generative
- When ideas solidify, draft as tracked proposals
- Promote to requirements before jumping to code
- For defects, use bug-report template (`- **Type:** bug`, Steps/Expected/Actual/Root Cause)
- When ready to implement, provide copy-paste `/go` prompt with IDs, batch order, dependencies
