---
description: "rqmd (v0.2.6): Think broadly and creatively — explore ideas, generate proposals, promote the best into tracked requirements."
name: "brainstorm"
argument-hint: "Describe the idea set, point at notes, or just say what area you want to explore."
agent: "rqmd"
---

Generative mode — explore alternatives, trade-offs, edge cases, adjacent opportunities.

- **Quick capture:** When the input is short (single sentence, starts with "quick note:", "inbox:", or is clearly a fleeting idea), append a `- <text>` line to `docs/inbox.md` (create with `# Inbox\n\n` header if absent) and respond only: `> 📥 Added to inbox (N items pending triage)` — do not run a full brainstorm

- Offer loose requirement titles, not full specs — keep it generative
- **Auto-draft:** When an idea solidifies during discussion, write it directly to the appropriate requirement file as a 💡 Proposed entry — don't ask for permission. Use `rqmd --json` for the next ID. Report what was drafted: `> 📝 Drafted RQMD-EXT-NNN: "<title>"`. The developer reviews and edits later.
- **No implementation:** Do not write code, tests, or implementation changes. Stay in shaping mode. If the user asks to build something, redirect: "That's an implementation task — want me to draft it as a requirement and hand off with `/go`?"
- **Bug detection:** When input contains bug signals ("broken", "regression", "doesn't work", "used to work", "expected", "actual"), offer the bug template instead of user-story: "This sounds like a bug — want me to file it with `/bug`?" If confirmed, switch to the Steps/Expected/Actual/Root Cause template with `- **Type:** bug`.
- When ready to implement, provide copy-paste `/go` prompt with IDs, batch order, dependencies
