---
name: rqmd-changelog
description: Keep CHANGELOG.md clear, human-led, and Keep a Changelog-aligned.
argument-hint: Describe the release slice, recent work, or changelog section that needs to be curated.
user-invocable: false
metadata:
  guide:
    summary: Curate CHANGELOG.md as a concise narrative led by user-visible outcomes and human decisions.
---

Maintain `CHANGELOG.md` as a clear release record. Lead with user impact and human decisions; AI implementation detail is subordinate, not absent.

## Done when

- `[Unreleased]` reflects all shipped changes
- Bullets lead with user-visible outcomes, not file names
- AI work is subordinate under a nested `## AI Development` heading when included
- Keep a Changelog structure (`### Added`, `### Changed`, `### Removed`) intact

## Edge cases

- Not a commit log — include AI work only when it explains a shipped outcome
- Prefer `Implemented RQMD-EXT-025: <description>` reference style over restating the requirement in prose
- Use `/rqmd-doc-sync` when the main task is requirement-doc alignment, not changelog quality
