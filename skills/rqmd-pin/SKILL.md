---
name: rqmd-pin
description: Capture durable context, decisions, or notes in a stable location.
argument-hint: Describe what to pin and where it should live if known.
user-invocable: false
metadata:
  guide:
    summary: Capture durable project context in a stable, reviewable home.
---

Save important context, decisions, or reminders where they stay findable after the session ends. Default to `docs/pins/` when the best home isn't obvious.

## Done when

- Note exists in a reviewable, permanent location (not just chat history)
- `docs/pins/README.md` index updated if pin lives there
- Linked to relevant requirements or docs for context

## Edge cases

- Don't replace canonical requirement or changelog records with pins
- If pin area needs structural cleanup, hand off to `/rqmd-docs`
