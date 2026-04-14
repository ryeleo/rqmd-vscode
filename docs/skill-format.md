# Skill Format: Focus Contract

Skills tell a smart agent what to narrow its attention to — not how to do its job.

## Why this format

The receiving agent is a capable fork of the same smart agent that loaded the skill. It already knows how to use `rqmd`, read files, run tests, and write code. Skills exist to **focus**, not to teach.

A skill that rehearses basic commands or walks through numbered steps is wasting context window on things the agent already knows. Worse, stale command references (like `rqmd-ai` after it was removed) actively mislead.

The focus-contract format keeps skills to a single screen: what the agent should care about, when it's done, and what's non-obvious.

## Format

```markdown
---
name: <skill-name>
description: <One sentence. When to load this skill.>
argument-hint: <What the user or agent should provide as input.>
user-invocable: false
metadata:
  guide:
    summary: <One sentence — same as description or slightly more specific.>
---

<Charter: 2-3 sentences. What this skill narrows the agent to do and why.>

## Done when

- <Exit criterion 1>
- <Exit criterion 2>
- <Exit criterion 3>

## Edge cases

- <Non-obvious gotcha that the agent can't derive from context>
- <Another one, if any>
```

### What goes where

| Section | Purpose | Length |
|---------|---------|-------|
| **Frontmatter** | Machine-readable metadata for VS Code skill discovery | Minimal — `name`, `description`, `argument-hint`, `user-invocable`, `guide.summary` |
| **Charter** | Human-readable focus declaration — what the agent should narrow to | 2-3 sentences |
| **Done when** | Concrete exit criteria so the agent knows when to stop | 3-5 bullets |
| **Edge cases** | Things the agent would get wrong without being told | 0-4 bullets; omit section if none |

### What does NOT belong in a skill

- **Command rehearsals** — the agent knows how to call `rqmd`
- **Step-by-step workflows** — the agent plans its own execution
- **Metadata `examples` arrays** — these were for cold-starting `rqmd-ai`; remove them
- **Metadata `workflow` arrays** — same; the charter replaces these
- **Duplicated agent contract** — that lives in `rqmd.agent.md` and `copilot-instructions.md`

## Exceptions

Some skills are **reference docs**, not workflows. These carry genuinely non-derivable information that the agent needs verbatim:

| Skill | Why it stays long |
|-------|-------------------|
| `rqmd-docs` | Style guide: heading rules, callout shapes, list formatting, diagram criteria — the agent can't infer these conventions |
| `rqmd-diagram` | Mermaid syntax table, validation command, checklist — syntax quirks the agent gets wrong without a reference |
| `rqmd-feedback` | Telemetry payload schema, category/severity tables — exact JSON shape the agent must produce |
| `rqmd-telemetry` | Event field reference, `send_event()` signature, config resolution order |

These skills still follow the focus-contract structure (charter → done-when → edge cases) but include additional **reference sections** after the edge cases. The reference content is kept because the agent literally cannot derive it from context.

## Examples

### Example 1: `rqmd-triage` (workflow skill — full trim)

**Before** (old format):

```markdown
---
name: rqmd-triage
description: Review, rank, and select the next rqmd backlog slice from tracked requirements.
argument-hint: Describe the backlog area, status filter, or requirement domain you want to triage.
user-invocable: false
metadata:
  guide:
    summary: Review and narrow the next implementation slice from tracked proposed requirements.
    workflow:
      - Export the current proposal queue with --dump-status proposed.
      - Narrow broad backlogs with --dump-file, --dump-id, or targeted rqmd filters.
      - Pick the highest-value 1-3 items using priority, blocking relationships, and batch size.
    examples:
      - rqmd-ai --json --dump-status proposed
      - rqmd-ai --json --dump-file core-engine.md
      - rqmd --status proposed --priority p1 --json --non-interactive
---

Use when tracked requirements exist and you need to decide what to work next.

## Workflow

1. Export proposals: `rqmd-ai --json --dump-status proposed`
2. Narrow with `--dump-file`, `--dump-id`, or rqmd filters if backlog is broad
3. Rank by priority, blocking relationships, batch size
4. Pick highest-value 1-3 items
5. Re-check priorities after each shipped batch

## Constraints

- Prefer tracked proposals over scratch notes
- Keep selection logic explicit for future agents
```

**After** (focus contract):

```markdown
---
name: rqmd-triage
description: Review, rank, and select the next backlog slice from tracked requirements.
argument-hint: Describe the backlog area, status filter, or domain you want to triage.
user-invocable: false
metadata:
  guide:
    summary: Narrow the backlog to the highest-value 1-3 items for the next implementation batch.
---

Pick what to work next from tracked proposed requirements. Rank by priority and blocking relationships, not recency. Output a ready-to-paste `/go` prompt naming the selected IDs.

## Done when

- 1-3 highest-priority items selected with explicit rationale
- `/go` handoff prompt provided (complete and concise: ID + one-line state per item)
- Remaining backlog acknowledged — no silent drops

## Edge cases

- Prefer tracked proposals over brainstorm scratch notes
- When backlog is broad, narrow by domain or priority filter before ranking
```

### Example 2: `rqmd-implement` (workflow skill — full trim)

**Before** (old format):

```markdown
---
name: rqmd-implement
description: Implement the highest-priority proposed rqmd requirements in small validated batches.
argument-hint: Describe the requirement IDs or behavior to implement and the expected validation scope.
user-invocable: false
metadata:
  guide:
    summary: Work highest-priority proposed requirements in small validated batches.
    workflow:
      - Start by reviewing proposed requirements and choose the highest-priority 1-3 items.
      - When refining requirement text, prefer user-story plus Given/When/Then acceptance bullets.
      - Update requirements, tests, and CHANGELOG entries as implementation details become concrete.
      - Before taking the next batch, verify rqmd still runs, verify summaries, run the test suite.
    examples:
      - rqmd-ai --json --workflow-mode implement
      - rqmd-ai --json --dump-status proposed
      - rqmd --verify-summaries --non-interactive
      - uv run --extra dev pytest -q
    batch_policy:
      max_items: 3
      selection_order: highest-priority proposed first
    validation_checks:
      - rqmd runs without startup errors
      - requirement summaries verify cleanly
      - full test suite passes
      - remaining proposal priorities are reviewed before continuing
---

Use when a requirement is ready to move from proposal to implementation.

## Workflow

1. Start: `rqmd-ai --json --workflow-mode implement`
2. Review proposals: `rqmd-ai --json --dump-status proposed`
3. Take highest-priority 1-3 items for the batch
4. **Use `next_id` from JSON output** for new IDs — never calculate manually
5. Add/refresh user story + Given/When/Then when it improves clarity
6. Update requirement docs, tests, README, and `CHANGELOG.md` as details emerge
7. Verify: `rqmd --verify-summaries --non-interactive`, targeted tests, then full test suite

## Constraints

- Keep changes focused; avoid unrelated refactors
- Re-check priorities before starting another batch
```

**After** (focus contract):

```markdown
---
name: rqmd-implement
description: Implement the highest-priority proposed requirements in small validated batches.
argument-hint: Describe the requirement IDs or behavior to implement and the expected validation scope.
user-invocable: false
metadata:
  guide:
    summary: Work highest-priority proposed requirements in small validated batches.
---

Move proposed requirements to implemented. Work 1-3 items per batch, updating requirement docs, tests, and CHANGELOG as details become concrete — not deferred to the end.

## Done when

- Requirement status updated to 🔧 Implemented
- Summaries verify cleanly (`rqmd --verify-summaries --non-interactive`)
- Tests pass (targeted + full suite via project `/test` skill)
- CHANGELOG updated under `[Unreleased]`
- Requirement docs match shipped behavior

## Edge cases

- Never invent requirement IDs — use `next_id` from `rqmd --json` output
- Max 3 items per batch; re-check priorities before taking another
- Prefer user-story + Given/When/Then when both clarify the behavior
```

### Example 3: `rqmd-verify` (compact skill — light trim)

**After** (focus contract):

```markdown
---
name: rqmd-verify
description: Run post-change validation — summaries, targeted tests, full tests, and residual risk.
argument-hint: Describe what changed and whether you want targeted or full verification.
user-invocable: false
metadata:
  guide:
    summary: Disciplined finish-pass verification after edits land.
---

Run the verification loop after changes land. Catch drift between code, requirement docs, and summaries before calling a batch complete.

## Done when

- `rqmd --verify-summaries --non-interactive` passes
- Targeted tests for the touched area pass
- Full test suite passes (use project `/test` skill for repo-specific commands)
- Residual risk or remaining drift explicitly called out

## Edge cases

- Don't hardcode test commands — use the project's `/test` skill
- If backlog changed, re-check proposal priorities before finishing
```

### Example 4: `rqmd-docs` (reference skill — keep body, trim top)

**After** (focus contract with reference body):

```markdown
---
name: rqmd-docs
description: Improve documentation quality — readability, structure, jargon, page organization.
argument-hint: Describe which pages need improvement and what kind of work (structure, clarity, splitting).
user-invocable: false
metadata:
  guide:
    summary: Improve documentation quality as a first-class workflow, not just a sync pass.
---

Improve documentation writing, structure, and organization. Use when docs need more than mechanical post-change alignment (that's `/rqmd-doc-sync`).

## Done when

- Headings, structure, and formatting follow the style guide below
- Summaries verify cleanly
- No secrets or credentials in docs or examples

## Edge cases

- Use `/rqmd-doc-sync` when the task is only alignment, not quality improvement
- Prefer focused improvements over needless rewrites

## Style guide

(Headings, page size, jargon, links, lists, callouts, diagram criteria — kept verbatim because not derivable from context.)
```

### Example 5: `rqmd-pin` (already near-minimal)

**After** (focus contract):

```markdown
---
name: rqmd-pin
description: Capture durable context, decisions, or notes in a maintained location.
argument-hint: Describe what to pin and where it should live if known.
user-invocable: false
metadata:
  guide:
    summary: Capture durable project context in a stable, reviewable home.
---

Save important context, decisions, or reminders where they stay findable after the session ends. Default to `docs/pins/` when the best location is unclear.

## Done when

- Note exists in a reviewable, permanent location (not just chat history)
- `docs/pins/README.md` index updated if pin lives there
- Linked to relevant requirements or docs for context

## Edge cases

- Don't replace canonical requirement or changelog records with pins
- If pin area needs structural cleanup, hand off to `/rqmd-docs`
```
