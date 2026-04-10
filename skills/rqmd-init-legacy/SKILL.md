---
name: rqmd-init-legacy
description: Compatibility alias for the older legacy-repo init flow. Prefer rqmd-init unless you need to force legacy-style repository seeding explicitly.
argument-hint: Describe the repository, preferred requirements directory, ID prefix, and whether GitHub issues should be consulted when available.
user-invocable: false
metadata:
  guide:
    summary: Seed rqmd into a legacy repository by reviewing a generated first-pass requirements catalog before writing it.
    workflow:
      - Start from the current repository structure, commands, docs, and backlog instead of assuming a blank scaffold.
      - Preview the generated requirements index and starter domain files before writing anything.
      - Apply the bootstrap only into an empty requirements directory, then immediately refine the generated seeds.
    examples:
      - rqmd-ai init --chat --json --legacy
      - rqmd-ai init --chat --json --legacy --show-guide
      - rqmd-ai init --json --legacy --write --id-namespace RQMD
  legacy_init:
    default_requirements_dir: docs/requirements
    max_domain_files: 5
    max_issue_requirements: 5
    max_source_areas: 4
---

Use when you explicitly need old legacy-init behavior or are following older docs.

## Workflow

1. Prefer `rqmd-ai init --chat --json --legacy` for new usage
2. Pass `--docs-dir` if nonstandard requirements location
3. Let workflow inspect repo structure; consult `gh issue list` when available
4. Use grouped interview for catalog defaults, workflow commands, and starter domains
5. Review generated README, workflow seed, domain seeds, and issue-backlog seed
6. Apply: `rqmd-ai init --json --legacy --write` (only when target dir is empty)

## Constraints

- Treat generated requirements as starting point
- Keep first write small and editable
- Continue gracefully when `gh` is unavailable or unauthenticated
