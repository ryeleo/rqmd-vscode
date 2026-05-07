---
description: "rqmd (v0.3.0): Start or continue the implementation loop. /go 10 = up to 10 validated slices."
name: "go"
argument-hint: "Describe the task, or provide a count such as '10' to keep going for up to that many validated slices."
agent: "rqmd"
---

Implementation loop.

- Clarify the smallest coherent slice; do not ask if intent is clear
- Blank, `next`, or `go` continues the current session thread first; priority is only a tiebreaker
- `N` in argument = slice cap
- Requirement-first when tracked requirements exist
- 💡 Proposed requirement with no acceptance criteria → ask once: "This hasn't been shaped yet — `/refine` first, or proceed anyway?"
- If user accepts the nudge, start an interactive `/refine` shaping loop before implementing
- Requirements with acceptance criteria skip the nudge — trust that shaping happened
- Focused edits; keep docs/README/CHANGELOG aligned; verify before finishing
- No commits unless explicitly requested (`/commit`, `/commit-and-go`)
- Emit requirement IDs as `<ID> [spec](docs/requirements/<domain>.md#L<line>)`; bare ID only when file is unknown
