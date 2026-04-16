---
description: "rqmd (v0.2.7): Focused documentation pass — README, changelog, doc sync, or docstrings."
name: "docs-polish"
argument-hint: "Describe what changed or which doc surface needs a pass. Can target README, changelog, requirement docs, or code docstrings."
agent: "rqmd"
---

Focus on docs quality, sync, and readability. Prefer `/rqmd-docs`, `/rqmd-doc-sync`, `/rqmd-changelog`.

- Keep requirement docs, README, CHANGELOG aligned with shipped behavior
- Audit code docstrings in touched area; fix stale ones as part of the same pass
- Smallest coherent doc slice; note code issues for `/refactor` separately
