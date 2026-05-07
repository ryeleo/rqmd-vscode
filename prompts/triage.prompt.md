---
description: "rqmd (v0.2.11): Rank the backlog and pick the next 1–3 items to work on."
name: "triage"
argument-hint: "Describe the backlog area, status filter, or domain to focus on — or leave blank for a full sweep."
agent: "rqmd"
---

Rank tracked proposals and select the next Slice.

- **Inbox-first sweep:** Check `docs/inbox.md` before ranking. If items exist, triage them: promote viable ones into tracked proposals (use `rqmd --json` for next ID + best-fit domain file), drop stale ones, leave unclear items in the inbox for next pass. Report: `> 📥 Inbox: N items swept (M promoted, K deferred, X dropped)`. Only after the sweep does the ranked backlog reflect reality.
- **Rank** the now-current 💡 Proposed set by priority and blocking relationships, not recency
- **Select** 1–3 highest-value items with explicit rationale (why these, why now, what's blocked-by-what)
- **Hand off** with a copy-paste `/go` prompt — complete and concise: enough context that the next agent can act without re-reading this triage. Per-item include the ID + spec link, the slice's intent, any open question, and any dependency. Length serves the handoff; do not force one-liners.
- Acknowledge what's deliberately deferred — no silent drops
- When backlog is broad, narrow by domain token or `--priority` filter before ranking
- **Emit requirement IDs as links:** `RQMD-SHAPE-010 [spec](docs/requirements/<domain>.md#L<line>)` — bare ID only when file is unknown
