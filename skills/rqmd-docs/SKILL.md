---
name: rqmd-docs
description: Improve repository documentation quality using authored standards for readability, structure, jargon handling, and page organization. Use when docs need more than simple drift correction.
argument-hint: Describe which documentation pages need improvement and whether the work is about structure, clarity, jargon, callouts, or splitting long pages.
user-invocable: false
metadata:
  guide:
    summary: Improve documentation quality as a first-class workflow, not just a sync pass.

---

Improve documentation writing, structure, and organization. Use when docs need more than mechanical post-change alignment (that's `/rqmd-doc-sync`).

## Done when

- Headings, structure, and formatting follow the style guide below
- `rqmd --verify-summaries --non-interactive` passes
- No secrets or credentials in docs or examples

## Edge cases

- Use `/rqmd-doc-sync` when the task is only alignment, not quality improvement
- Prefer focused improvements over needless rewrites

## Style guide

- **Headings:** Start at h1, do not skip levels. **Always leave a blank line before and after every heading** — without surrounding blank lines, markdown parsers may treat the heading as a paragraph continuation instead of a block element. This applies to all heading levels (`#` through `######`).
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

> **⚠️ Note:** Introduce project-specific jargon on first use.

> **🚨 Warning:** Do not paste tokens or credentials into documentation.

## When to add diagrams

Diagrams help when prose alone confuses readers about:
- State machines, mode transitions, lifecycle states
- Call graphs, data pipelines, save/restore flows
- Decision trees with branching logic

Add diagrams inline using fenced `mermaid` blocks. Use `/rqmd-diagram` for syntax rules and validation.

