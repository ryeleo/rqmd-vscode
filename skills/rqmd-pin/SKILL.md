---
name: rqmd-pin
description: Capture durable context, decisions, and quick-reference notes in a maintained home that stays easy to find across sessions. Use for project memory, decision logs, pinned reminders, and choosing where persistent notes should live.
argument-hint: Describe what should be pinned, whether it is a new note or an update, and where it currently lives if a location already exists.
user-invocable: false
metadata:
  guide:
    summary: Capture durable project context in a stable, reviewable home instead of leaving it buried in chat history.
    workflow:
      - Decide whether the note belongs in an existing nearby doc, a README section, or a dedicated `docs/pins/` area.
      - Prefer one focused note per topic, defaulting to `docs/pins/` when the best location is unclear.
      - Keep pin collections navigable with an index page and hand broader organization cleanup to `/rqmd-docs` when needed.
    examples:
      - rqmd-ai --json --dump-id RQMD-AI-042 --include-requirement-body
      - rqmd --verify-summaries --non-interactive
      - rqmd-ai --json --dump-status proposed
---

Use when important context should stay findable after the session ends.

## Workflow

- Decide location: existing doc, README section, or `docs/pins/`
- Default to `docs/pins/` with one file per topic when unclear
- Keep a `docs/pins/README.md` index; use `pin-template.md` for new notes
- Link pins to relevant requirements/docs for context
- Use `/rqmd-docs` when pin area needs structure cleanup

## Constraints

- Do not replace canonical requirement or changelog records
- Prefer stable storage over chat transcripts or scratch files
