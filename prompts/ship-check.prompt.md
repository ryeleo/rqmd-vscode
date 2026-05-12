---
description: "rqmd (v0.3.1): Release readiness pass — verification, docs, changelog, blockers."
name: "ship-check"
argument-hint: "Describe what is about to ship, or say what kind of final verification you want."
agent: "rqmd"
---

Release-readiness check.

- Run smoke and validation commands
- Confirm tests pass, docs are synchronized, CHANGELOG is accurate, and blockers are absent
- Confirm README/CHANGELOG/requirement docs reflect shipped behavior
- Call out blockers/risk plainly
- Clear go/no-go + recommended follow-ups
