---
name: rqmd-init
description: Initialize rqmd in a repository using the default chat-first flow, with heuristic routing between starter scaffold and legacy-style repository seeding.
argument-hint: Describe the repository, preferred requirements directory, ID prefix, whether to force legacy mode, and whether the AI chat flow should drive the interview.
user-invocable: false
metadata:
  guide:
    summary: Start rqmd with the unified init workflow, favoring the AI-chat flow and falling back to explicit compatibility paths when needed.
    workflow:
      - Start with the chat-first init command so the receiving AI can drive the grouped interview and preview the generated files.
      - Let rqmd choose between starter scaffold mode and legacy-style repository seeding unless the repository needs an explicit legacy override.
      - Review the generated requirements catalog and any suggested `/dev` and `/test` workflow skills before writing.
      - Apply only after explicit confirmation, then verify summaries and begin refining the generated requirements.
    examples:
      - rqmd-ai init --chat --json
      - rqmd-ai init --chat --json --legacy
      - rqmd-ai init --json --write --legacy --id-namespace RQMD
      - rqmd init
  legacy_init:
    default_requirements_dir: docs/requirements
    max_domain_files: 5
    max_issue_requirements: 5
    max_source_areas: 4
---

Use when bringing rqmd into a repository for the first time.

## Workflow

1. Start: `rqmd-ai init --chat --json` or `rqmd init`
2. Paste generated handoff prompt into AI chat for grouped interview
3. Let init choose strategy automatically unless repo clearly needs `--legacy`
4. Review generated index, starter files, and skill previews before writing
5. Apply only after confirmation
6. Verify: `rqmd --verify-summaries --non-interactive`
7. Refine generated requirements

## Constraints

- Treat generated requirements as starting point, not final truth
- Keep `/rqmd-init-legacy` available as compatibility path
