# Bundle and Workflow Requirements

Scope: installed AI bundle content — agents, skills, prompts, and workflow guidance contributed by the VS Code extension to every workspace where the extension is active.

<!-- acceptance-status-summary:start -->
Summary: 7💡 39🔧 2✅ 0⚠️ 0⛔ 2🗑️
<!-- acceptance-status-summary:end -->

### RQMD-EXT-001: Installable AI agent/skill instruction bundle
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd to install a standard agent/skill instruction bundle into the workspace so that AI agents have a consistent contract for JSON modes, workflow sequencing, and requirement/doc update expectations.

### RQMD-EXT-002: Requirement-first AI workflow guidance
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and docs to prescribe a requirement-first workflow before code is applied so that brainstorm ideas are promoted into tracked requirements, index updates, and changelog entries before implementation starts.

### RQMD-EXT-003: Brainstorm-to-requirements planning mode
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai to support a dedicated brainstorm workflow that turns raw notes into ranked requirement proposals so that loose brainstorming can be promoted into concrete requirement entries before implementation begins.

### RQMD-EXT-004: Proposal-batch implementation mode
- **Status:** 🔧 Implemented
- **Priority:** 🔴 P0 - Critical
- **Summary:** Rqmd-ai guidance to define an explicit implement mode that works the highest-priority proposed requirements in small validated batches so that the agent updates requirements, tests, and changelog entries as details become concrete rather than deferring documentation until the end.

### RQMD-EXT-005: Resource-backed AI UX source of truth
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The user-facing AI UX text for rqmd-ai to be sourced from editable package resource markdown/metadata instead of embedded Python constants so that workflow summaries, examples, validation checks, and other guide text can be updated in one central resources/bundle location without code edits.

### RQMD-EXT-006: Default bundled skill-definition export when bundle is absent
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Default rqmd-ai output to include the packaged skill and agent YAML/markdown definitions directly from resources so that an AI consumer can bootstrap from the shipped definitions immediately without requiring a prior bundle-install step.

### RQMD-EXT-007: Bundle-aware suppression of duplicate default skill exports
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd-ai to detect the installed bundle and avoid redundantly embedding the packaged skill and agent definitions in default output so that guidance stays concise and does not duplicate definitions that are already present in the local workspace.

### RQMD-EXT-008: Project-specific dev and test skill scaffolding
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Bundle bootstrap to help generate project-local `dev` and `test` skills tailored to that repository's actual commands and workflows so that the installed `rqmd-dev` agent can delegate build, run, smoke-test, and test behavior to project-specific skills instead of relying on generic assumptions.

### RQMD-EXT-009: Agent-driven bundle bootstrap chat
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The rqmd bundle bootstrap flow to be driveable through an AI-guided chat session so that bundle install can interview the user about the project's build, run, dev, and test commands instead of forcing all customization through manual file edits.

### RQMD-EXT-010: rqmd-dev delegation to project dev and test skills
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** `rqmd-dev` guidance to explicitly depend on repository-specific `dev` and `test` skills when they exist so that implementation agents know where to find the canonical project commands for building, running, smoke-testing, and validating the work under development.

### RQMD-EXT-011: Legacy-repo init skill and workflow
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** An `init-legacy` AI skill or workflow that helps bootstrap rqmd from the repository's existing reality so that adoption can start from the current codebase, docs, backlog, and conventions instead of requiring a blank-slate scaffold.

### RQMD-EXT-012: Useful first-pass requirements folder for legacy repos
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The legacy-init flow to produce a useful first-pass `requirements/` folder that I can immediately start editing and using so that the resulting requirements docs reflect the repository's current product areas, workflows, and likely work streams instead of only a generic starter example.

### RQMD-EXT-013: Optional GitHub issue discovery during legacy init
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The legacy-init workflow to try using `gh` to inspect repository issues when the GitHub CLI is available and authenticated so that rqmd can incorporate the existing issue backlog into its first-pass requirement suggestions instead of ignoring a major source of project intent.

### RQMD-EXT-014: Init-chat AI handoff prompt generation
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` init workflows to emit a ready-to-paste handoff prompt for an external AI assistant so that I can start the guided bootstrap experience by pasting one concise prompt instead of manually explaining the expected command flow.

### RQMD-EXT-015: Concise copy/paste init prompt UX
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to print a concise human-facing "paste this into your AI chat" prompt when requested so that the init-chat flow is understandable even when the user has not yet learned the JSON interview protocol.

### RQMD-EXT-016: Unified init workflow with heuristic routing
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to expose a single `init` workflow name instead of forcing me to choose between a "new" and "legacy" mental model up front so that init entry feels simple even when the tool needs to choose a different setup path behind the scenes.

### RQMD-EXT-017: Explicit legacy-init compatibility and override flag
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An explicit compatibility path to force legacy-style initialization when needed so that repositories with strange layouts or incomplete heuristics are still easy to initialize intentionally.

### RQMD-EXT-018: Chat-first init entrypoint for new projects
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai init --chat` to be the canonical AI-facing onboarding entrypoint so that the recommended startup path is one clear command instead of a mix of `install`, `init-legacy`, and hand-written guidance.

### RQMD-EXT-019: Default init guidance favors AI chat flow
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The default help, onboarding guide output, and initialization hints to recommend the AI-chat workflow first so that the product teaches the strongest end-to-end flow by default instead of expecting users to discover it from scattered flags and examples.

### RQMD-EXT-020: Init interview recommends a project-specific ID prefix
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The `rqmd-ai init` interview to strongly recommend a short project-specific ID prefix instead of only generic fallbacks such as `REQ`, `RQMD`, or `AC` so that requirement IDs are easier to recognize, less likely to collide with other catalogs, and more meaningful in discussion and documentation.

### RQMD-EXT-021: Init interview exposes default-checked suggested choices
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Multi-select init questions to declare which suggested or recommended options should start checked by default so that users can plainly see what the workflow intends to pick unless they actively uncheck those defaults.

### RQMD-EXT-022: Explicit interactive interview contract for receiving agents
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The payload to explicitly declare that the receiver should switch into a structured interactive interview mode so that the receiving AI presents a real one-question-at-a-time multi-choice session instead of summarizing the JSON and asking for freeform answers after every step.

### RQMD-EXT-023: Encourage dual user-story and Given/When/Then requirement authoring
- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and editing workflows to actively encourage requirements that include both a user story and a Given/When/Then acceptance block when both are useful so that generated or edited requirements are easier to understand at both the product-intent and implementation-detail levels.

### RQMD-EXT-024: Default markdown closeout styling for installed AI guidance
- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** The installed default agent instructions to prefer a concise markdown closeout structure such as `# What got done`, `# Up next`, and `# Direction` so that implementation updates are easier to scan quickly in AI chat transcripts and review handoffs.

### RQMD-EXT-025: Long-running priority-first development agent
- **Status:** �️ Deprecated
- **Priority:** 🟠 P1 - High
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-longrunning` agent variant that explicitly tries to continue making progress for as long as feasible so that the agent works proposed requirements in priority order, keeps reassessing the backlog after each validated batch, and stops only when it reaches a real blocker, exhausts feasible work, or completes the active slice.

> Behavior absorbed into unified `rqmd` agent via `/go N` (slice count argument). No separate agent variant needed.

### RQMD-EXT-026: Easy-first low-hanging-fruit development agent
- **Status:** �️ Deprecated
- **Priority:** 🟡 P2 - Medium
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-easy` agent variant that focuses on low-risk, high-confidence requirement slices first so that the agent preferentially picks low-hanging-fruit proposed requirements where it can make clean progress with minimal exploratory risk.

> Behavior absorbed into unified `rqmd` agent via `/go easy-win` (constraint argument). No separate agent variant needed.

### RQMD-EXT-027: Legacy-init installs local schema guidance into generated requirement indexes
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The generated `docs/requirements/README.md` or `requirements/README.md` to include the current local rqmd schema guidance that AI agents need during follow-up work so that the initialized repository contains a nearby, tool-owned schema reference instead of forcing humans or AI agents to rely on memory, external docs, or a missing side file.

### RQMD-EXT-028: Authored changelog maintenance skill
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-changelog` skill for maintaining `CHANGELOG.md` so that changelog work becomes a first-class authored workflow instead of an implicit side effect of generic docs cleanup.

### RQMD-EXT-029: General documentation-quality skill
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-docs` skill for documentation quality and structure work beyond simple drift correction so that README, requirement docs, bundle guidance, and other markdown can be improved using explicit standards for headings, clarity, jargon handling, page splitting, hyperlinks, and callouts instead of only being kept mechanically in sync.

### RQMD-EXT-030: Consistent cross-project AI workflow experience
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Shipped rqmd agents and skills to behave consistently across projects even when the requirement catalogs and priorities differ so that users build trust and familiarity with the AI workflows instead of relearning a different style in every repository.

### RQMD-EXT-031: Pinned context and decision notes workflow
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An `rqmd-pin` workflow for capturing important context, decisions, and quick-reference notes that should remain easy to find later so that useful insights do not disappear into chat history or scattered documentation during brainstorming and implementation.

### RQMD-EXT-032: Prompt-first single-agent bundle entrypoints
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to install focused prompt entrypoints such as `/go` alongside one primary implementation agent so that the default user experience can stay centered on `rqmd` instead of forcing users to choose among several agent variants up front.

### RQMD-EXT-033: Installed prompt suite for common rqmd actions
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a visible suite of focused prompts for common actions such as go, next, brainstorm, docs passes, pinning, and ship checks so that I can discover and invoke the most common rqmd workflows quickly without memorizing the lower-level skill names or choosing among multiple agents up front.

### RQMD-EXT-034: Count-aware go prompts and commit-per-slice variant
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Prompt arguments like `/go 10` to mean "work through up to 10 validated slices" and a separate `/commit-and-go` prompt for explicitly commit-authorized long runs so that long-running prompt usage can be more expressive than a single slice without forcing me to switch to a different agent variant.

### RQMD-EXT-035: Workspace bundle provenance and refresh metadata
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Each workspace bundle install to record which rqmd version and JSON schema version generated the local bundle files so that I can tell at a glance which rqmd release last installed or refreshed the prompts, skills, and instructions in that repository.

### RQMD-EXT-036: Single-agent-first bundle install defaults with explicit reinstall/upgrade commands
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Default `rqmd-ai install` behavior to keep one primary implementation agent and offer explicit `reinstall`/`upgrade` commands for bundle lifecycle operations so that normal bundle installs avoid surprising users with extra specialized agent files when they wanted the default single-agent experience.

### RQMD-EXT-037: Bundle bootstrap asks whether `/dev` and `/test` skills should support multiple platforms
- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** Bundle bootstrap to ask whether generated `/dev` and `/test` skills should include cross-platform guidance so that rqmd does not silently lock a team into one shell or platform assumption when the repository actually needs broader support.
- Given a maintainer is generating repository-local `/dev` and `/test` skills through rqmd bundle bootstrap
- When the bootstrap interview determines or suspects that more than one platform may be relevant
- Then it should explicitly ask whether cross-platform support should be enabled for those generated skills unless the maintainer is confident the repository only targets a single platform
- And the generated guidance should either include the agreed cross-platform commands and caveats or clearly record that the repository is intentionally single-platform
- And Windows-oriented environments such as Git Bash should be treated as first-class cases rather than implicit Unix-only fallbacks.

### RQMD-EXT-038: Agent preflight verifies repository readiness before implementation
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** A canonical agent-facing workflow entry point that exposes a `preflight` readiness check so that missing prerequisites are surfaced before an agent burns time failing inside the middle of a batch.
- Given a developer wants to hand the repository to one or more AI agents for implementation work
- When the repository's agent workflow entry point is run in `preflight` mode at the start of that workflow
- Then it should verify the canonical repository prerequisites such as expected shell tooling, rqmd availability, generated or maintained workspace guidance files, and any project-specific validation hooks
- And the workflow surface should be simple enough that agents and humans can treat it as the single obvious starting point instead of hunting across multiple scripts or tasks
- And it should report missing or stale prerequisites with precise fixes instead of letting the failure surface later inside an agent run
- And it should exit with a machine-readable success or failure result, including per-check status and remediation guidance, so prompts, tasks, and automation can gate on the same readiness check.

### RQMD-EXT-039: Agent workflow metadata has one source of truth
- **Status:** 💡 Proposed
- **Priority:** 🟠 P3 - Low
- **Summary:** Canonical agent-workflow metadata to live in one maintained source of truth so that workflow instructions do not drift across the derived surfaces that humans and agents actually consume.
- Given the repository documents AI development workflow details across prompts, skills, settings, scripts, and markdown guidance
- When a maintainer updates a canonical workflow detail such as the preferred validation command, bootstrap path, or required toolchain
- Then that detail should be defined in one maintained source of truth and propagated to the derived docs or configuration surfaces that need it
- And the repository should include a repeatable check or generation path that catches drift before stale workflow instructions reach developers or agents.

### RQMD-EXT-040: Generated agent workflow entry point is the canonical agent execution surface
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** One generated agent-workflow entry point to be the canonical surface for routine agent actions so that agents do not need to discover or memorize a scattered set of shell commands, tasks, and skill-local conventions.
- Given a repository adopts rqmd-managed agent workflows
- When an agent needs to perform its primary repository tasks
- Then the repository should expose one stable agent-facing entry point with subcommands such as `preflight` and `validate`
- And repository-specific operations such as compile, focused test, broader test, docs verification, or other primary workflows should be reachable through that same maintained interface rather than ad hoc standalone commands
- And the interface should stay stable enough that prompts, skills, tasks, and automation can treat it as the primary execution contract for agent work.

### RQMD-EXT-041: `/dev` and `/test` skills can defer to a canonical agent-invocable interface
- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd bundle guidance to allow `/dev` and `/test` skills to defer to that one interface instead of teaching agents a sprawl of individual shell commands so that the repository can avoid maintaining two competing sources of truth for agent execution behavior.
- Given a repository has a maintained agent-workflow entry point that already covers preflight, validation, and primary development tasks
- When rqmd generates or refreshes repository-local `/dev` and `/test` skills
- Then those skills should direct agents to invoke the canonical interface rather than restating the raw command set in parallel
- And the canonical interface should be designed for easy blanket-allow in IDE or tool-approval configurations, for example by keeping all agent actions routed through one executable path that approval systems can trust once
- And rqmd should allow repositories to omit separate `/dev` and `/test` skills entirely when the unified entry point is sufficient and explicitly chosen
- And the bundle guidance should make clear when those skills remain useful as thin wrappers or discovery aids versus when they should be treated as redundant
- And the guidance should remain technology-neutral, supporting shell scripts, Makefiles, justfiles, or other task-runner conventions without forcing one choice.

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

### RQMD-EXT-045: Rename primary agent from `rqmd-dev` to `rqmd`
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The primary agent to be named `rqmd` instead of `rqmd-dev`, since it is the agent I interact with 95% of the time and the `-dev` suffix makes it sound like a secondary internal tool so that `rqmd` becomes the obvious, default agent name across all projects that install the bundle.

### RQMD-EXT-046: Auto-draft requirements during brainstorm and refine sessions
- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** The agent to automatically write solidified ideas into `docs/requirements/` as 💡 Proposed entries rather than asking me for permission each time so that when any session picks up the `/go` handoff prompt, the requirements it references already exist in the tracked docs and the implementation session has a clear contract to work from.

### RQMD-EXT-047: Brainstorm and refine modes resist jumping to implementation
- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to actively resist writing code, tests, or implementation changes and instead focus on shaping, clarifying, and tracking requirements so that the brainstorm/refine workflow stays focused on *what* to build and *why*, with implementation deferred to a `/go` handoff in a focused implementation session.

### RQMD-EXT-048: Brainstorm and refine skills detect bug reports and offer bug template
- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to recognize that I am describing a bug (keywords like "broken", "regression", "doesn't work", "used to work") and offer the Steps to Reproduce / Expected / Actual / Root Cause template from RQMD-CORE-043 instead of the user-story template so that bugs are drafted with the right shape from the start, with `type: bug` and an `affects:` cross-reference pre-filled when the parent requirement is identifiable.

### RQMD-EXT-049: `/bug` prompt for quick bug filing from chat context
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** To type `/bug` and have the agent automatically draft a tracked bug requirement from the conversation context so that filing a bug is zero-friction — no template hunting, no manual ID allocation, no asking permission — the agent just writes it to the appropriate domain file and tells me the ID.
- Given a chat session where a defect was discussed
- When the user invokes `/bug`
- Then the agent reviews conversation context, runs `rqmd-ai --json` to discover the next available ID and best-fit domain file, and writes a complete bug requirement using the Steps to Reproduce / Expected / Actual / Root Cause template with `type: bug` and an `affects:` cross-reference when identifiable.
- And the agent appends the requirement directly to the domain file without asking for confirmation.
- And the prompt file lives at `.github/prompts/bug.prompt.md` in the workspace and in the bundle at `src/rqmd/resources/bundle/.github/prompts/bug.prompt.md`.

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
