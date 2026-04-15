---
name: rqmd-brainstorm
description: Turn brainstorm notes or loose ideas into ranked requirement proposals before implementation.
argument-hint: Describe the brainstorm source and which requirement area it should likely affect.
user-invocable: false
metadata:
  guide:
    summary: Turn loose planning notes into ranked requirement proposals before implementation starts.
  brainstorm:
    default_target_file: bundle.md
    default_priority_rank: -1
    proposal_title:
      max_words: 10
      max_chars: 96
    section_targets:
      - tokens: [agent, skill, prompt, workflow, init, bundle]
        target_file: bundle.md
      - tokens: [extension, vscode, marketplace, bootstrap, install, chat participant]
        target_file: extension.md
    priority_hints:
      - tokens: [critical, p0, must, crash, fails, regression, broken, bug]
        priority_rank: 0
      - tokens: [implement, workflow, agent, ai, summary, readme, blocking]
        priority_rank: 1
      - tokens: [priority, filter, link, schema, user story, screen]
        priority_rank: 2
---

Turn brainstorm notes in `docs/brainstorm.md` into tracked 💡 Proposed entries. Don't write code — shape ideas until they're ready to hand off via `/go`.

## Quick capture (Inbox)

When input is short or prefixed with "quick note:" / "inbox:", append to `docs/inbox.md` instead of running a full brainstorm. Create the file with `# Inbox\n\n` header if absent. Respond only: `> 📥 Added to inbox (N items pending triage)`.

## Done when

- Viable ideas promoted to requirement entries with IDs, statuses, priorities, and target domain files
- `docs/brainstorm.md` trimmed of promoted items
- Ready-to-paste `/go` prompt provided when items are ready for implementation

## Edge cases

- Never calculate IDs — use `next_id` from `rqmd --json` output
- Bug-shaped ideas get `- **Type:** bug` + Steps/Expected/Actual/Root Cause template, not user-story
- Keep output read-only until reviewed; no code changes in brainstorm phase
- Always write `<a id="rqmd-xxx-nnn"></a>` immediately before each new `### RQMD-XXX-NNN:` heading when promoting brainstorm items to requirements
