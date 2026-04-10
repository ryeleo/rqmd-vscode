---
description: "Quickly file a bug from the current chat context — drafts a tracked bug requirement from the conversation so a frustrated user can just type /bug and move on."
name: "bug"
argument-hint: "Optionally describe the bug, or leave blank to draft from chat context."
agent: "rqmd"
---

File a bug requirement for **your project** from the current chat context.

> **ℹ️ Info:** This prompt creates a tracked requirement in your project's `docs/requirements/` folder. To report an issue with **rqmd itself**, use `/feedback` instead.

**Goal:** Turn the problem the user has been discussing into a tracked, actionable bug requirement with minimal friction. The user is probably frustrated — be efficient, not chatty.

**Before saying anything to the user:**
1. Review the current conversation to identify the defect: what is broken, what was expected, what actually happens, and any reproduction steps already discussed.
2. If the invocation argument describes the bug, use that as the basis for the "short title". Otherwise, synthesize a concise title (5-10 words) from the chat context.
3. Run `rqmd bug "SYNTHESIZED_TITLE" --json` to generate the requirement boilerplate, allocate the ID, and create the file in `docs/requirements/bugs.md`.
4. The CLI will return JSON containing the new `id`, `file`, and `line`.

**Draft the bug content from context:**
The CLI creates a skeleton. Your job is to fill in the details in that same file:
- **Priority:** Infer from severity (P1 for broken core flows, P2 for annoying but workable, P3 for cosmetic).
- **Affects:** If identifiable, add `- **Affects:** PREFIX-NNN` below the `Type: bug` line.
- **Steps to Reproduce:** Extract from chat.
- **Expected:** Extract from chat.
- **Actual:** Extract from chat.
- **Root Cause:** Fill in if discussed, else leave the placeholder.

**Apply the details:**
- Use the `edit_file` tool to update the placeholders in the file created by the CLI.
- Do not ask for permission — just write it.
- Tell the user what you filed: the requirement ID, the title, and a link to the file.

**After filing:**
- Offer to run `rqmd --verify-summaries --non-interactive` to confirm the new requirement parses cleanly.
- If the user wants to refine the bug further, suggest `/refine PREFIX-NNN`.
- If the user wants to fix it right now, suggest `/go PREFIX-NNN`.
