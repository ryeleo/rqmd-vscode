---
name: rqmd-changelog
description: Keep CHANGELOG.md clear, human-led, and Keep a Changelog-aligned. Use when preparing Unreleased notes, tightening noisy release entries, or deciding which implementation details belong in the public changelog.
argument-hint: Describe the release slice, recent work, or changelog section that needs to be curated.
user-invocable: false
metadata:
  guide:
    summary: Curate CHANGELOG.md as a concise release narrative led by user-visible outcomes and human decisions.
    workflow:
      - Start from the shipped behavior, requirement updates, and recent user-directed changes.
      - Write the primary changelog bullets for end-user impact, release-relevant decisions, and notable workflow shifts.
      - Keep supporting AI implementation detail subordinate under a nested heading such as `AI Development` when it adds useful context.
    examples:
      - rqmd --verify-summaries --non-interactive
      - rqmd-ai --json --dump-status proposed
      - rqmd-ai --json --workflow-mode implement
---

Use when changelog quality matters as its own task, not just a docs-sync side effect.

## Workflow

- Update `CHANGELOG.md` under `Unreleased` before cutting a version
- Lead with user-visible behavior changes and human-directed decisions
- Prefer `Implemented RQMD-UNDO-008: <description>` over `Updated status to mark ... as Implemented`
- Keep low-signal detail under a nested `AI Development` heading
- Format per `/rqmd-docs`: nest bullets, use **Subject:** pattern, add subheadings when releases grow large
- Keep changelog aligned with requirement docs, README, and bundle text

## Constraints

- Preserve Keep a Changelog structure
- Not a commit log — include AI work only when it explains shipped outcome
