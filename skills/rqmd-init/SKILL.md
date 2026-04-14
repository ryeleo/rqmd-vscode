---
name: rqmd-init
description: Bootstrap rqmd through an AI-driven structured interview — new or existing repos.
argument-hint: Describe the repository (new project vs. existing codebase with code/docs/issues), preferred ID prefix, and whether GitHub issues should be consulted.
user-invocable: false
metadata:
  guide:
    summary: Interview the user to build a tailored requirements catalog, /dev and /test skills, and project scaffold.
  legacy_init:
    default_requirements_dir: docs/requirements
    max_domain_files: 5
    max_issue_requirements: 5
    max_source_areas: 4
---

Onboard a repository into rqmd through a structured multi-choice interview with smart defaults. For existing repos, explore the codebase first — the interview surfaces what actually matters in this project — then write the scaffold from confirmed answers.

## Done when

- `docs/requirements/` exists with an index and at least one seeded domain file
- `/dev` and `/test` skills populated with the repo's confirmed build/run/test commands
- ID prefix confirmed and recorded in the requirements index
- `rqmd --verify-summaries --non-interactive` passes

## Interview flow

Conduct as a structured multi-choice conversation with smart defaults pre-selected:

1. **Repo context** — language, framework, build system; run `gh issue list --limit 20` when `gh` is available
2. **ID prefix** — suggest a short project-specific prefix (3-5 chars); avoid generic fallbacks like `REQ` or `RQMD`
3. **Requirement domains** — propose up to `max_domain_files` domain files from discovered source areas; let user confirm/remove/add
4. **Dev skill** — discover build and run commands; draft `skills/dev/SKILL.md` with confirmed commands
5. **Test skill** — discover test commands and smoke path; draft `skills/test/SKILL.md`
6. **Seed requirements** — draft P2 stubs for discovered features and open issues (max `max_issue_requirements` from issues; max `max_source_areas` source areas)

Then write: run `rqmd --scaffold` (or command palette "rqmd: Initialize Project") for the requirements index; write `/dev`, `/test` skills and domain seed files directly.

## Edge cases

- Treat all seeded requirements as starting points — mark P2 and adjust priorities after review
- For repos with existing `docs/requirements/`: do not overwrite; offer to add new domain files alongside
- Continue gracefully when `gh` is unavailable or unauthenticated
- Keep first write small: respect `max_domain_files` and `max_issue_requirements` limits
