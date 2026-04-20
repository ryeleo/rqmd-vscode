# Feedback and Telemetry Requirements

Scope: User-driven rqmd product feedback, telemetry skills, and GitHub issue creation from feedback sessions.

<!-- acceptance-status-summary:start -->
Summary: 1💡 3🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-042"></a>

### RQMD-EXT-042: `/feedback` prompt for user-driven rqmd improvement feedback

- **Status:** 🔧 Implemented
- **Priority:** 🔴 P0 - Critical
- **Summary:** A `/feedback` prompt that starts an interactive feedback session focused on improving rqmd itself so that I can accumulate actionable feedback and improvement ideas from real-world usage across all my rqmd-managed repositories.
- Given a user invokes `/feedback` in any repository where the rqmd bundle is installed
- When the prompt activates
- Then the agent immediately submits a telemetry event of type `feedback` with severity `low` to record that a feedback session was started, including the repository name, agent name, and a generated session ID
- And the agent asks the user what friction, idea, or observation they want to report
- And as the user describes their feedback, the agent iteratively refines a structured feedback payload (summary, category, severity, detail, and optional suggested improvement)
- And the agent submits updated telemetry events of type `feedback` as the payload evolves, so partial feedback is never lost even if the session is interrupted
- And the final feedback event includes a polished summary, the refined detail payload, and a severity chosen collaboratively with the user
- And the prompt file lives at `.github/prompts/feedback.prompt.md` in the workspace and in the bundle at `src/rqmd/resources/bundle/.github/prompts/feedback.prompt.md`.

<a id="rqmd-ext-043"></a>

### RQMD-EXT-043: `/rqmd-feedback` skill teaching agents the feedback workflow

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** An `/rqmd-feedback` skill that teaches agents how to conduct a structured feedback session so that the `/feedback` prompt has clear workflow guidance including payload structure, telemetry submission mechanics, and iterative refinement steps.
- Given the rqmd bundle is installed in a repository
- When the `/rqmd-feedback` skill is loaded by an agent
- Then it describes the feedback event schema (summary, category, severity, detail fields, suggested improvement)
- And it teaches the agent to submit an initial `feedback` event on session start, update events as the payload evolves, and submit a final polished event on session close
- And it documents valid feedback categories: `ux_friction`, `missing_feature`, `docs_gap`, `workflow_confusion`, `performance`, and `other`
- And it explains how to use `submit_event()` from `src/rqmd/telemetry.py` with `event_type="feedback"` for all feedback telemetry
- And the skill file lives at `.github/skills/rqmd-feedback/SKILL.md` in the workspace and in the bundle at `src/rqmd/resources/bundle/.github/skills/rqmd-feedback/SKILL.md`.

<a id="rqmd-ext-044"></a>

### RQMD-EXT-044: GitHub issue creation from feedback sessions

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The `/feedback` prompt to offer creating a GitHub issue on the `ryeleo/rqmd` repository when the feedback describes an actionable issue so that concrete issues are tracked in GitHub without requiring me to context-switch away from the feedback session.
- Given a feedback session has produced a refined payload that describes a concrete bug, missing feature, or docs gap
- When the agent determines the feedback is specific enough to be an issue and the user confirms they want to file one
- Then the agent checks whether `gh` CLI is installed and authenticated (`gh auth status`)
- And if `gh` is available, the agent drafts an issue title and body from the feedback payload and runs `gh issue create --repo ryeleo/rqmd --title "..." --body "..."` to create the issue
- And the created issue URL is included in the final feedback telemetry event under `detail.github_issue_url`
- And if `gh` is not available or the user declines, the agent skips issue creation gracefully and notes it in the feedback payload as `detail.issue_skipped_reason`.

<a id="rqmd-ext-050"></a>

### RQMD-EXT-050: Feedback and telemetry are rqmd product features, not project skills

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** It to be immediately clear that `/feedback`, `/rqmd-feedback`, and `/rqmd-telemetry` exist to improve **rqmd itself** — not to track bugs or feedback about my own project so that I understand the difference between:.
  - **Project bugs:** filed as requirements in `docs/requirements/` via `/bug` or `rqmd bug`
  - **rqmd product feedback:** sent to the rqmd telemetry service to help the rqmd developer prioritize improvements
- Given a user invokes `/feedback` or reads the `rqmd-telemetry` skill description
- When they see the skill documentation
- Then it explicitly states "This skill is for reporting issues with **rqmd itself**, not your project" or equivalent framing
- And the `/bug` prompt documentation clarifies that bugs filed with `/bug` are **project requirements**, not rqmd product feedback
- And copilot-instructions.md and related AI guidance repeat the distinction so agents do not conflate the two.

