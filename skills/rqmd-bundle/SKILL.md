---
name: rqmd-bundle
description: Install, refresh, and explain the rqmd AI agent and skill bundle for a workspace. Use for onboarding repositories, previewing bundle changes, preserving customized files, and clarifying how skills relate to approval prompts.
argument-hint: Describe whether you want a dry-run preview, minimal/full install, overwrite behavior, or bundle customization.
user-invocable: true
metadata:
  guide:
    summary: Preview or install the rqmd Copilot bundle while preserving workspace customizations by default.
    workflow:
      - Preview bundle changes first with a dry run.
      - Install the minimal or full preset intentionally.
      - Overwrite existing workspace customization files only when replacement is explicitly desired.
    examples:
      - rqmd-ai i --json --bundle-preset minimal --dry-run
      - rqmd-ai install --json
      - rqmd-ai install --json --bundle-preset full --overwrite-existing
---

Use when work is about Copilot instructions, agents, skills, or bundle installation.

## Workflow

1. **Preview:** `rqmd-ai i --json --bundle-preset minimal --dry-run`
2. **AI-guided onboarding:** add `--chat` for grouped interview with multi-select, skip support, and `/dev`+`/test` skill previews
3. **Install:** `rqmd-ai install --json`
   - Use `--answer FIELD=VALUE` to correct inferred commands
   - Review generated `/dev` and `/test` skills; replace weak guesses with canonical workflows
4. **Overwrite:** Use `--overwrite-existing` only when intentional

## Constraints

- Preserve customized files unless overwrite requested
- Skills improve discovery but do not bypass terminal/tool approvals
