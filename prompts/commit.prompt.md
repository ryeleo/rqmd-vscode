---
description: "rqmd (v0.2.6): Commit current work with a clear, human-narrative git message."
name: "commit"
argument-hint: "Optionally describe the focus of this commit, or leave blank to auto-summarize from the diff."
agent: "rqmd"
---

Create a clean git commit.

**Message format:**
- Subject: concise human decision, not file list
- Body: human motivation + `# AI Development` section with agent work summary

- Footer: `AI agent: <model> <version>`

**Workflow:**
1. Review `git diff --staged` and `git diff`
2. Stage coherent unit; ask if changes span unrelated concerns
3. Commit; report hash + summary
4. No amend/force-push, no sweeping unrelated changes
