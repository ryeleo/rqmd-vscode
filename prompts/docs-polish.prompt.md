---
description: "Run a focused documentation pass — README polish, changelog cleanup, doc sync, or docstring alignment after behavior changes."
name: "docs-polish"
argument-hint: "Describe what changed or which doc surface needs a pass. Can target README, changelog, requirement docs, or code docstrings."
agent: "rqmd"
---

Focus on docs quality, sync, and readability. Prefer `/rqmd-docs`, `/rqmd-doc-sync`, `/rqmd-changelog`.

- Keep requirement docs, README, CHANGELOG aligned with shipped behavior
- Audit code docstrings in touched area; fix stale ones as part of the same pass
- Smallest coherent doc slice; note code issues for `/refactor` separately
