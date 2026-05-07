# Feedback and Telemetry Requirements

Scope: User-driven rqmd product feedback, telemetry skills, and GitHub issue creation from feedback sessions.

<!-- acceptance-status-summary:start -->
Summary: 1💡 6🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ai-feedback-001"></a>

### RQMD-AI-FEEDBACK-001: `/feedback` prompt for user-driven rqmd improvement feedback

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

<a id="rqmd-ai-feedback-002"></a>

### RQMD-AI-FEEDBACK-002: `/rqmd-feedback` skill teaching agents the feedback workflow

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

<a id="rqmd-ai-feedback-003"></a>

### RQMD-AI-FEEDBACK-003: GitHub issue creation from feedback sessions

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The `/feedback` prompt to offer creating a GitHub issue on the `ryeleo/rqmd` repository when the feedback describes an actionable issue so that concrete issues are tracked in GitHub without requiring me to context-switch away from the feedback session.
- Given a feedback session has produced a refined payload that describes a concrete bug, missing feature, or docs gap
- When the agent determines the feedback is specific enough to be an issue and the user confirms they want to file one
- Then the agent checks whether `gh` CLI is installed and authenticated (`gh auth status`)
- And if `gh` is available, the agent drafts an issue title and body from the feedback payload and runs `gh issue create --repo ryeleo/rqmd --title "..." --body "..."` to create the issue
- And the created issue URL is included in the final feedback telemetry event under `detail.github_issue_url`
- And if `gh` is not available or the user declines, the agent skips issue creation gracefully and notes it in the feedback payload as `detail.issue_skipped_reason`.

<a id="rqmd-ai-feedback-004"></a>

### RQMD-AI-FEEDBACK-004: Feedback and telemetry are rqmd product features, not project skills

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

<a id="rqmd-ai-feedback-005"></a>

### RQMD-AI-FEEDBACK-005: Auto-instrument rqmd skills with telemetry at known struggle points

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Built-in rqmd skills (`rqmd-implement`, `rqmd-verify`, `rqmd-triage`, `rqmd-init`, `rqmd-status-maintenance`) explicitly instruct agents to emit `struggle` telemetry at named friction points so that signal arrives automatically without depending on the agent remembering to load `/rqmd-telemetry`.
- Given an agent is following a built-in rqmd skill
- When the skill encounters a documented friction point — `rqmd` command not found, non-zero exit from `--verify-summaries`, malformed JSON output, repeated retry on the same command, or fallback to direct file edits
- Then the skill instructs the agent to call `rqmd.telemetry.send_event` inline as part of the workflow rather than as a separate skill load
- And each instrumented friction point is listed explicitly in the relevant skill so the agent does not need to infer them
- And telemetry calls embedded in skills include workflow context (skill name, step name) under `detail.workflow`
- And the `/rqmd-telemetry` skill remains available for ad-hoc reports outside skill flows.
- And telemetry payloads assembled by embedded skill calls are passed through the scrubbing pipeline defined in RQMD-TELEMETRY-016 before submission, so that no secrets or PII leave the client even from inline instrumentation points.

<a id="rqmd-ai-feedback-006"></a>

### RQMD-AI-FEEDBACK-006: `/telemetry-review` prompt — cluster telemetry into proposed requirements

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** A `/telemetry-review` prompt that pulls recent telemetry events from the rqmd service, clusters them by category and root cause, and drafts proposed requirements directly into `rqmd-cli/docs/requirements/` so that telemetry signal closes the loop into the implementation workflow without manual triage in Adminer.
- Given the rqmd developer invokes `/telemetry-review` in the `rqmd-cli` workspace
- When the prompt activates
- Then the agent queries the telemetry service (or local tunnel) for events in a configurable window (default last 14 days)
- And events are clustered by `category`, `summary` similarity, and frequency to surface recurring friction
- And each cluster of ≥2 events is presented with: severity range, distinct repos affected, representative `detail.command` and `stderr_snippet`, and a suggested requirement title
- And on developer confirmation, the agent drafts each accepted cluster as a 💡 Proposed requirement in the appropriate `docs/requirements/` file, including a back-reference to the telemetry query that produced it
- And clusters that match existing open requirements are flagged as duplicates rather than redrafted.

<a id="rqmd-ai-feedback-007"></a>

### RQMD-AI-FEEDBACK-007: Emit telemetry when user reports hard-wrapping violations

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The `rqmd-docs` skill and `rqmd` mode instructions to include an explicit instrumentation point that emits a `feedback` telemetry event whenever a user reports that prose was hard-wrapped at a fixed column width, so that the persistence and model-specific patterns of this recurring violation are tracked as queryable signal rather than disappearing into chat history.
- Given an agent is operating under the `rqmd-docs` skill or the `rqmd` mode instructions
- When the user says something that indicates hard-wrapping occurred — e.g. "still wrapping", "line wrapping issues", "hard wrapped", "fix the wrapping", "don't wrap lines", or any complaint that prose was reflowed or broken at ~80/100 chars
- Then the agent emits a telemetry event with `event_type="feedback"`, `severity="medium"`, `detail.category="doc_style_violation"`, and `detail.violation="hard_wrap"`
- And `detail.model_id` is populated with the active model identifier per RQMD-TELEMETRY-017 [spec](../../rqmd-cli/docs/requirements/telemetry.md) so violations are attributed to the model that caused them
- And `detail.context` contains a short snippet (≤120 chars) of the hard-wrapped prose that triggered the complaint, if the agent can identify it
- And the instrumentation point is listed explicitly in both `skills/rqmd-docs/SKILL.md` and in the `rqmd` mode instructions so agents do not need to infer when to emit it
- And the event is submitted in addition to — not instead of — fixing the hard-wrapping in the document
- And the `rqmd-feedback` skill documents `doc_style_violation` as a valid `detail.category` value alongside the existing categories.
- **Related:** RQMD-DOCS-011 [spec](docs-ux.md#L138) — the sentence-per-line convention this instrumentation tracks compliance for; RQMD-TELEMETRY-017 [spec](../../rqmd-cli/docs/requirements/telemetry.md) — model_id field required.
