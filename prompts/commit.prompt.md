---
description: "rqmd (v0.3.1): Commit current work with a clear, human-narrative git message."
name: "commit"
argument-hint: "Optionally describe the focus of this commit, or leave blank to auto-summarize from the diff."
agent: "rqmd"
---

Create a clean git commit.

- Review `git diff --staged` and `git diff`; stage only one coherent unit.
- Ask before committing if changes span unrelated concerns.
- Message: subject is a human decision, body explains motivation, `# AI Development` summarizes agent work, footer is `AI agent: <model> <version>`.
- No amend, force-push, or sweeping unrelated changes.
- Commit and report hash plus one-line summary.
