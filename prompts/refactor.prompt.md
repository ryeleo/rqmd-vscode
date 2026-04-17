---
description: "rqmd (v0.2.9): Refactor code, docs, or artifacts — improve quality without changing behavior."
name: "refactor"
argument-hint: "Describe what to refactor, or point at the file or area that needs attention."
agent: "rqmd"
---

Refactor structure without changing behavior.

**Naming:** audit consistency + semantic clarity; use design-pattern vocabulary and project glossary

**Functions:** split large/nested → smaller, focused, testable; single responsibility + clear names

**Modules:** split large files when distinct responsibilities interleave; clear purpose from name + docstring

**Docstrings:** update to match current behavior; remove stale comments; consistent style

**Ground rules:**
- No behavior change unless explicit approval
- Tests after each step
- Small reviewable commits, not monolithic diff
