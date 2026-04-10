---
description: "Start or continue the implementation loop. A numeric argument such as /go 10 means work through up to 10 validated slices before stopping."
name: "go"
argument-hint: "Describe the task, or provide a count such as '10' to keep going for up to that many validated slices."
agent: "rqmd"
---

Implementation loop.

- Clarify smallest coherent slice; don't ask if intent is clear
- `next` or `go` → pick highest-priority feasible slice
- `N` in argument = slice cap
- Requirement-first when tracked requirements exist
- Focused edits; keep docs/README/CHANGELOG aligned; verify before finishing
- No commits unless explicitly requested (`/commit`, `/commit-and-go`)
