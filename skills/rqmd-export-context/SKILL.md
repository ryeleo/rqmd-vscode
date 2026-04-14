---
name: rqmd-export-context
description: Export focused rqmd context for prompts, reviews, and automation handoffs. Use for next-batch proposal slices, single-requirement deep dives, or bounded domain context when an agent needs only the relevant requirements.
argument-hint: Describe whether you need next-batch proposals, one requirement, or bounded domain context.
user-invocable: false
metadata:
  guide:
    summary: Default rqmd workflow for context export and status updates.
    workflow:
      - Export context with --dump-id/--dump-status/--dump-file.
      - Draft updates using --update ID=STATUS without --write to preview.
      - Apply only after review by adding --write.
    examples:
      - rqmd --status proposed --json --non-interactive
      - rqmd --json --non-interactive
      - rqmd --update RQMD-CORE-001=implemented
      - rqmd --verify-summaries --non-interactive
---

Get the minimum requirement context needed to proceed. Prefer reading `docs/requirements/*.md` directly for single requirements or domain context. Use `rqmd --json` for a machine-readable catalog overview.

## Done when

- Agent has the requirement IDs, statuses, and acceptance criteria it needs
- Context scoped to the relevant slice — no full-catalog dumps

## Edge cases

- For next-batch selection: `rqmd --status proposed --json --non-interactive` then narrow to 1-3 items
- For machine-readable full catalog: `rqmd --json --non-interactive`
- Prefer direct file reads for single requirements — faster and more precise than CLI roundtrip
