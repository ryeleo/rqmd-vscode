---
name: rqmd-docs
description: Improve repository documentation quality using authored standards for readability, structure, jargon handling, and page organization. Use when docs need more than simple drift correction.
argument-hint: Describe which documentation pages need improvement and whether the work is about structure, clarity, jargon, callouts, or splitting long pages.
user-invocable: true
metadata:
  guide:
    summary: Improve documentation quality as a first-class workflow, not just a sync pass.
    workflow:
      - Start from the active documentation standards and the audience for the page.
      - Improve headings, page structure, hyperlinks, jargon explanations, and list formatting so the doc is faster to scan and easier to trust.
      - Split oversized pages into smaller linked pages or index pages when that meaningfully improves navigation.
    examples:
      - rqmd --verify-summaries --non-interactive
      - rqmd-ai --json --dump-id RQMD-AI-040 --include-requirement-body
      - rqmd-ai --json --dump-status proposed
---

Use when documentation needs better writing, structure, or organization — not just post-change alignment.

## Workflow

- **Headings:** Start at h1, do not skip levels
- **Page size:** Prefer smaller pages; create index pages when splitting improves navigation
- **Jargon:** Introduce acronyms on first use; add Info callouts for extra context
- **Links:** Use descriptive hyperlinks, not raw URLs or backticked filenames
- **Lists:** Break dense prose into lists when they improve scanning
  - **Nest bullets** for sub-detail or grouped facets
  - Use **Subject:** pattern for scannable bold leads
- **Promotion:** Promote topics needing emphasis beyond bold to subheadings
- **Text styles:** **strong** for key terms; *emphasis* for caveats; ***strong emphasis*** sparingly
- **Emoji:** Consistent lifecycle labels (💡 🔧 ✅) and callout icons (ℹ️ ⚠️ 🚨) — signal, not decoration
- **Secrets:** Never include in docs or examples

## Callouts

Use these exact shapes:

> **ℹ️ Info:** `rqmd --verify-summaries --non-interactive` only verifies summaries.

> **⚠️ Note:** Expand `rqmd-ai` on first use if introduced before `rqmd`.

> **🚨 Warning:** Do not paste tokens or credentials into documentation.

## When to add diagrams

Diagrams help when prose alone confuses readers about:
- State machines, mode transitions, lifecycle states
- Call graphs, data pipelines, save/restore flows
- Decision trees with branching logic

Add diagrams inline using fenced `mermaid` blocks. Use `/rqmd-diagram` for syntax rules and validation.

## Constraints

- Use `/rqmd-doc-sync` when the task is only alignment
- Keep requirement docs, README, and bundle text consistent with shipped behavior
- Prefer focused improvements over needless rewrites
