---
description: "Work through one or more validated slices and create a clean git commit after each. A numeric argument such as /commit-and-go 10 means keep going for up to 10 committed slices."
name: "commit-and-go"
argument-hint: "Describe the task, or provide a count such as '10' to keep going and commit each validated slice."
agent: "rqmd"
---

Implementation loop with commit after each validated slice.

- Check dirty worktree first: commit current work as baseline or ask if ambiguous
- Clarify smallest coherent slice before editing
- `N` in argument = cap on slices to commit
- Clean non-amended commit per slice; don't sweep unrelated changes
- Keep docs/CHANGELOG aligned; run verification before each commit
