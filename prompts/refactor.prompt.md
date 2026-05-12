---
description: "rqmd (v0.3.1): Refactor code, docs, or artifacts — improve quality without changing behavior."
name: "refactor"
argument-hint: "Describe what to refactor, or point at the file or area that needs attention."
agent: "rqmd"
---

Refactor structure without changing behavior.

- Naming: audit consistency and semantic clarity; use design-pattern vocabulary and project glossary.
- Functions: split large or nested code into smaller focused units with clear names.
- Modules: split files only when responsibilities interleave; keep boundaries easy to explain.
- Docstrings/comments: update stale behavior notes and remove noise.
- No behavior change without explicit approval.
- Tests after each coherent step; prefer small reviewable diffs.
