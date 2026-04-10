---
description: "Suggest the highest-priority feasible next slice, prefer handoff via /go, and keep worktree health explicit."
name: "next"
argument-hint: "Say 'next' to continue the backlog, or add a constraint such as 'easy-win', 'docs-only', or 'release-prep'."
agent: "rqmd"
---

Choose and recommend next slice with copy-paste `/go` prompt.

- Prefer tracked requirements; pick highest-priority feasible item
- If ambiguous, short re-triage with trade-offs
- Constraints: `easy-win`, `docs-only`, `release-prep`
- Remind to commit/stash if worktree is dirty
- Execute only if user asks
