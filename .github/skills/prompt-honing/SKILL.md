---
name: prompt-honing
description: Tighten rqmd-vscode prompt files so they stay short, technical, and easy for AI agents to execute.
argument-hint: Name the prompt file or behavior to hone.
user-invocable: false
metadata:
  guide:
    summary: Keep bundled prompts compact while preserving the exact decision cues agents need.
---

Hone prompt files in this repository.
Treat prompts as entrypoints: they say when to act, what context matters, and what to output.
Move reusable or detailed policy into skills; keep prompt bodies easy to scan in one pass.

## Done when

- Frontmatter is accurate: `description`, `name`, `argument-hint`, and `agent`
- Body defaults to one screen: charter plus 3–7 sharp bullets; headings only when they reduce scanning
- Instructions name decision signals, constraints, and output contract before examples
- Priority is a tiebreaker when session continuity or dependency flow is the real decision signal
- Bundle surface is intentional: do not add repo-local prompt-honing files to `package.json` contributions

## Edge cases

- If a prompt becomes step-by-step workflow documentation, split it: prompt = trigger and output; skill = reusable policy
- If examples are needed, keep them schematic and shorter than the rule they illustrate
- Preserve copied `/go` handoffs; users invoke prompts to leave the next agent enough context to act
- This skill is local developer tooling under `.github/skills/`; it must not be listed under `contributes.chatSkills`