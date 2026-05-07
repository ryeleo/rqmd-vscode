---
description: "rqmd (v0.3.0): Suggest the next logical step given session context and backlog state."
name: "next"
argument-hint: "Say 'next' to continue from where you left off, or add a constraint such as 'easy-win', 'docs-only', or 'release-prep'."
agent: "rqmd"
---

Surface the next logical step by reading session context first, then backlog state.

- Read signals in order: dirty worktree, recent completions, in-progress work, newly unblocked dependencies, then backlog priority.
- Recommend 2–3 options when more than one logical continuation exists: continue current thread, take an unblocked follow-up, or resume older in-progress work.
- Each option includes IDs with `[spec]` links, one sentence for why it is next, blockers/dependencies, and a copy-paste `/go` prompt.
- Priority is a tiebreaker after session continuity and dependency flow, never the first reason to switch contexts.
- If there is no session signal, say "Fresh start" and fall back to priority plus blocking relationships.
- Constraints `easy-win`, `docs-only`, `release-prep` filter options before ranking.
- Remind to commit or stash before switching away from dirty work; execute only if asked.
