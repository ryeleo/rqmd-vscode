---
description: "rqmd (v0.3.0): Work through validated slices and commit after each. /commit-and-go 10 = up to 10 committed slices."
name: "commit-and-go"
argument-hint: "Describe the task, or provide a count such as '10' to keep going and commit each validated slice."
agent: "rqmd"
---

Implementation loop with commit after each validated slice.

- Check dirty worktree first: commit current work as baseline or ask if ambiguous
- Clarify smallest coherent slice before editing
- Blank, `next`, or `go` continues the current session thread first; priority is only a tiebreaker
- `N` in argument = cap on slices to commit
- Clean non-amended commit per slice; don't sweep unrelated changes
- Keep docs/CHANGELOG aligned; run verification before each commit
