---
name: rqmd-export-context
description: Export focused rqmd and rqmd-ai context for prompts, reviews, and automation handoffs. Use for next-batch proposal slices, single-requirement deep dives, or bounded domain markdown when an agent needs only the relevant context.
argument-hint: Describe whether you need next-batch proposals, one requirement, or bounded domain context.
user-invocable: false
metadata:
  guide:
    summary: Default read-only rqmd-ai workflow for context export, preview, and guarded apply.
    workflow:
      - Export context with --dump-id/--dump-status/--dump-file.
      - Draft updates using --update ID=STATUS without --write to preview.
      - Apply only after review by adding --write.
    examples:
      - rqmd-ai --json --dump-status proposed
      - rqmd-ai --json --dump-id RQMD-CORE-001 --include-requirement-body
      - rqmd-ai --json --dump-file ai-cli.md --include-domain-markdown
      - rqmd-ai --update RQMD-CORE-001=implemented
      - rqmd-ai --update RQMD-CORE-001=implemented --write
---

Use when an agent needs precise context instead of the full repository.

## Workflow

- **Baseline:** `rqmd-ai --json`
- **Next-batch handoff:** `rqmd-ai --json --dump-status proposed` → narrow to highest-priority 1-3 items
- **Single requirement:** `rqmd-ai --json --dump-id <ID> --include-requirement-body`
- **Domain context:** `rqmd-ai --json --dump-file <domain>.md --include-domain-markdown --max-domain-markdown-chars <N>`

## Constraints

- Scope exports tightly — avoid full backlog dumps
- One requirement or bounded domain at a time when possible
