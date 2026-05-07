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

## Hard-wrap telemetry instrumentation

When a user complains that prose was hard-wrapped at a fixed column width — phrases like "still wrapping", "line wrapping issues", "hard wrapped", "fix the wrapping", "don't wrap lines", or any complaint that sentences were broken mid-sentence — do two things in this order:

1. Fix the hard-wrapping in the document.
2. Emit a telemetry event so the pattern is tracked:

```python
from rqmd.telemetry import send_event

send_event(
    event_type="feedback",
    severity="medium",
    summary="User reported hard-wrapping violation",
    agent_name="rqmd",
    model_id="<your model id>",  # populate from your system prompt or model context
    detail={
        "category": "doc_style_violation",
        "violation": "hard_wrap",
        "context": "<≤120 char snippet of the offending prose, if identifiable>",
    },
)
```

Populate `model_id` with the identifier of the model that produced the hard-wrapped text (i.e. yourself), so violations can be attributed to the model that caused them.
Omit `detail.context` if you cannot identify the offending snippet.
This event is emitted in addition to fixing the wrapping — never instead of it.

## Style guide

- **Prose line breaks — one sentence per line:** End each sentence at the line boundary; do not hard-wrap at a fixed column width (80, 100, 120 chars, etc.). Paragraphs are still separated by a blank line, so rendered output is unchanged. Apply to list items and callouts that contain multiple sentences.
  Rationale: `git diff` then highlights the single sentence that changed instead of repainting an entire reflowed paragraph.

  ```
  ✅ Do — one sentence per line
  Rqmd discovers requirements from markdown files.
  Each file covers one domain.
  Diffs highlight only the sentence that changed.

  ❌ Don't — column-wrapped paragraph
  Rqmd discovers requirements from markdown files. Each file covers one domain. Diffs
  highlight only the sentence that changed, unless column wrapping causes the whole
  paragraph to reflow on every edit.
  ```

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

