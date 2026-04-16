---
description: "rqmd (v0.2.7): Start or continue the implementation loop. /go 10 = up to 10 validated slices."
name: "go"
argument-hint: "Describe the task, or provide a count such as '10' to keep going for up to that many validated slices."
agent: "rqmd"
---

Implementation loop.

- Clarify smallest coherent slice; don't ask if intent is clear
- `next` or `go` → pick highest-priority feasible slice
- `N` in argument = slice cap
- Requirement-first when tracked requirements exist
- **Shaping check:** When given a specific requirement ID with 💡 Proposed status, read the requirement body. If it has no acceptance criteria (no Given/When/Then, no Steps/Expected/Actual, no `## Done when`), it is **unshaped** — say once: “This hasn’t been shaped yet — want me to `/refine` it first, or proceed anyway?” One question, not a wall; proceed immediately with explicit confirmation.

- If user accepts the nudge, start an interactive `/refine` shaping loop before implementing
- Requirements with acceptance criteria skip the nudge — trust that shaping happened
- Focused edits; keep docs/README/CHANGELOG aligned; verify before finishing
- No commits unless explicitly requested (`/commit`, `/commit-and-go`)
- **Emit requirement IDs as links:** `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` — bare ID only when file is unknown
