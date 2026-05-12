---
description: "rqmd (v0.3.1): Rank the backlog and pick the next 1–3 items to work on."
name: "triage"
argument-hint: "Describe the backlog area, status filter, or domain to focus on — or leave blank for a full sweep."
agent: "rqmd"
---

Rank tracked proposals and select the next slice.

- Inbox first: sweep `docs/inbox.md` before ranking; promote viable items, drop stale ones, leave unclear items.
- Rank the current 💡 Proposed set by priority, blockers, dependencies, and batch size; not recency.
- Select 1–3 items with explicit rationale: why these, why now, and what is blocked by what.
- Handoff with a copy-paste `/go` prompt containing IDs with `[spec]` links, intent, dependencies, and open questions.
- Acknowledge deliberate deferrals; no silent drops.
- When broad, narrow by domain token or priority filter before ranking.
