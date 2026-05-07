---
description: "rqmd (v0.2.12): Suggest the next logical step given session context and backlog state."
name: "next"
argument-hint: "Say 'next' to continue from where you left off, or add a constraint such as 'easy-win', 'docs-only', or 'release-prep'."
agent: "rqmd"
---

Surface the next logical step by reading session context first, then backlog state.

## Step 1 — Read session context

Scan for signals in this order:

1. **Recently completed requirements** — check `Implemented`/`Verified` items changed in recent commits or this conversation
2. **In-progress / partially-done work** — any requirement touched but not closed out
3. **Unblocked items** — requirements whose `Blocked` status may have cleared because a dependency just landed
4. **Priority** — use as tiebreaker once logical ordering is established, not as the primary signal

## Step 2 — Build 2–3 options

Produce a short numbered list of candidate next steps, each grounded in session context.
Each option must include:
- The requirement ID(s) with `[spec]` links
- One sentence explaining *why* it's next (what just happened that makes this the logical follow-on)
- A copy-paste `/go` prompt the user can run directly

Format example (adapt to actual IDs and context):

> **Option 1 — Continue in-progress work**
> We finished RQMD-CORE-003 [spec](...) and RQMD-CORE-004 [spec](...); RQMD-CORE-007 [spec](...) was blocked on both and is now unblocked.
> `/go implement RQMD-CORE-007`
>
> **Option 2 — Close out the open thread**
> RQMD-CORE-002 [spec](...) was partially implemented this session; finishing it avoids context fragmentation.
> `/go implement RQMD-CORE-002`

## Step 3 — Housekeeping reminders

- If worktree is dirty, remind to commit or stash before switching slices
- If no clear session context exists (fresh start), fall back to highest-priority proposed item and say so explicitly
- Constraints `easy-win`, `docs-only`, `release-prep` filter all options — apply before ranking
- Execute only if the user explicitly asks
