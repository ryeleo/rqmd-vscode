# Bundle and Workflow Requirements

Scope: installed AI bundle content — agents, skills, prompts, and workflow guidance contributed by the VS Code extension to every workspace where the extension is active.

<!-- acceptance-status-summary:start -->
Summary: 12💡 51🔧 2✅ 0⚠️ 0⛔ 3🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-001"></a>

### RQMD-EXT-001: Installable AI agent/skill instruction bundle

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd to install a standard agent/skill instruction bundle into the workspace so that AI agents have a consistent contract for JSON modes, workflow sequencing, and requirement/doc update expectations.

<a id="rqmd-ext-002"></a>

### RQMD-EXT-002: Requirement-first AI workflow guidance

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and docs to prescribe a requirement-first workflow before code is applied so that brainstorm ideas are promoted into tracked requirements, index updates, and changelog entries before implementation starts.

<a id="rqmd-ext-003"></a>

### RQMD-EXT-003: Brainstorm-to-requirements planning mode

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai to support a dedicated brainstorm workflow that turns raw notes into ranked requirement proposals so that loose brainstorming can be promoted into concrete requirement entries before implementation begins.

<a id="rqmd-ext-004"></a>

### RQMD-EXT-004: Proposal-batch implementation mode

- **Status:** 🔧 Implemented
- **Priority:** 🔴 P0 - Critical
- **Summary:** Rqmd-ai guidance to define an explicit implement mode that works the highest-priority proposed requirements in small validated batches so that the agent updates requirements, tests, and changelog entries as details become concrete rather than deferring documentation until the end.

<a id="rqmd-ext-005"></a>

### RQMD-EXT-005: Resource-backed AI UX source of truth

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The user-facing AI UX text for rqmd-ai to be sourced from editable package resource markdown/metadata instead of embedded Python constants so that workflow summaries, examples, validation checks, and other guide text can be updated in one central resources/bundle location without code edits.

<a id="rqmd-ext-006"></a>

### RQMD-EXT-006: Default bundled skill-definition export when bundle is absent

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Default rqmd-ai output to include the packaged skill and agent YAML/markdown definitions directly from resources so that an AI consumer can bootstrap from the shipped definitions immediately without requiring a prior bundle-install step.

<a id="rqmd-ext-007"></a>

### RQMD-EXT-007: Bundle-aware suppression of duplicate default skill exports

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd-ai to detect the installed bundle and avoid redundantly embedding the packaged skill and agent definitions in default output so that guidance stays concise and does not duplicate definitions that are already present in the local workspace.

<a id="rqmd-ext-008"></a>

### RQMD-EXT-008: Project-specific dev and test skill scaffolding

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Bundle bootstrap to help generate project-local `dev` and `test` skills tailored to that repository's actual commands and workflows so that the installed `rqmd-dev` agent can delegate build, run, smoke-test, and test behavior to project-specific skills instead of relying on generic assumptions.

<a id="rqmd-ext-009"></a>

### RQMD-EXT-009: Agent-driven bundle bootstrap chat

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The rqmd bundle bootstrap flow to be driveable through an AI-guided chat session so that bundle install can interview the user about the project's build, run, dev, and test commands instead of forcing all customization through manual file edits.

<a id="rqmd-ext-010"></a>

### RQMD-EXT-010: rqmd-dev delegation to project dev and test skills

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** `rqmd-dev` guidance to explicitly depend on repository-specific `dev` and `test` skills when they exist so that implementation agents know where to find the canonical project commands for building, running, smoke-testing, and validating the work under development.

<a id="rqmd-ext-011"></a>

### RQMD-EXT-011: Legacy-repo init skill and workflow

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** An `init-legacy` AI skill or workflow that helps bootstrap rqmd from the repository's existing reality so that adoption can start from the current codebase, docs, backlog, and conventions instead of requiring a blank-slate scaffold.

<a id="rqmd-ext-012"></a>

### RQMD-EXT-012: Useful first-pass requirements folder for legacy repos

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The legacy-init flow to produce a useful first-pass `requirements/` folder that I can immediately start editing and using so that the resulting requirements docs reflect the repository's current product areas, workflows, and likely work streams instead of only a generic starter example.

<a id="rqmd-ext-013"></a>

### RQMD-EXT-013: Optional GitHub issue discovery during legacy init

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The legacy-init workflow to try using `gh` to inspect repository issues when the GitHub CLI is available and authenticated so that rqmd can incorporate the existing issue backlog into its first-pass requirement suggestions instead of ignoring a major source of project intent.

<a id="rqmd-ext-014"></a>

### RQMD-EXT-014: Init-chat AI handoff prompt generation

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` init workflows to emit a ready-to-paste handoff prompt for an external AI assistant so that I can start the guided bootstrap experience by pasting one concise prompt instead of manually explaining the expected command flow.

<a id="rqmd-ext-015"></a>

### RQMD-EXT-015: Concise copy/paste init prompt UX

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to print a concise human-facing "paste this into your AI chat" prompt when requested so that the init-chat flow is understandable even when the user has not yet learned the JSON interview protocol.

<a id="rqmd-ext-016"></a>

### RQMD-EXT-016: Unified init workflow with heuristic routing

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to expose a single `init` workflow name instead of forcing me to choose between a "new" and "legacy" mental model up front so that init entry feels simple even when the tool needs to choose a different setup path behind the scenes.

<a id="rqmd-ext-017"></a>

### RQMD-EXT-017: Explicit legacy-init compatibility and override flag

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An explicit compatibility path to force legacy-style initialization when needed so that repositories with strange layouts or incomplete heuristics are still easy to initialize intentionally.

<a id="rqmd-ext-018"></a>

### RQMD-EXT-018: Chat-first init entrypoint for new projects

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai init --chat` to be the canonical AI-facing onboarding entrypoint so that the recommended startup path is one clear command instead of a mix of `install`, `init-legacy`, and hand-written guidance.

<a id="rqmd-ext-019"></a>

### RQMD-EXT-019: Default init guidance favors AI chat flow

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The default help, onboarding guide output, and initialization hints to recommend the AI-chat workflow first so that the product teaches the strongest end-to-end flow by default instead of expecting users to discover it from scattered flags and examples.

<a id="rqmd-ext-020"></a>

### RQMD-EXT-020: Init interview recommends a project-specific ID prefix

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The `rqmd-ai init` interview to strongly recommend a short project-specific ID prefix instead of only generic fallbacks such as `REQ`, `RQMD`, or `AC` so that requirement IDs are easier to recognize, less likely to collide with other catalogs, and more meaningful in discussion and documentation.

<a id="rqmd-ext-021"></a>

### RQMD-EXT-021: Init interview exposes default-checked suggested choices

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Multi-select init questions to declare which suggested or recommended options should start checked by default so that users can plainly see what the workflow intends to pick unless they actively uncheck those defaults.

<a id="rqmd-ext-022"></a>

### RQMD-EXT-022: Explicit interactive interview contract for receiving agents

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The payload to explicitly declare that the receiver should switch into a structured interactive interview mode so that the receiving AI presents a real one-question-at-a-time multi-choice session instead of summarizing the JSON and asking for freeform answers after every step.

<a id="rqmd-ext-023"></a>

### RQMD-EXT-023: Encourage dual user-story and Given/When/Then requirement authoring

- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and editing workflows to actively encourage requirements that include both a user story and a Given/When/Then acceptance block when both are useful so that generated or edited requirements are easier to understand at both the product-intent and implementation-detail levels.

<a id="rqmd-ext-024"></a>

### RQMD-EXT-024: Default markdown closeout styling for installed AI guidance

- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** The installed default agent instructions to prefer a concise markdown closeout structure such as `# What got done`, `# Up next`, and `# Direction` so that implementation updates are easier to scan quickly in AI chat transcripts and review handoffs.

<a id="rqmd-ext-025"></a>

### RQMD-EXT-025: Long-running priority-first development agent

- **Status:** 🗑️ Deprecated
- **Priority:** 🟠 P1 - High
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-longrunning` agent variant that explicitly tries to continue making progress for as long as feasible so that the agent works proposed requirements in priority order, keeps reassessing the backlog after each validated batch, and stops only when it reaches a real blocker, exhausts feasible work, or completes the active slice.

> Behavior absorbed into unified `rqmd` agent via `/go N` (slice count argument). No separate agent variant needed.

<a id="rqmd-ext-026"></a>

### RQMD-EXT-026: Easy-first low-hanging-fruit development agent

- **Status:** 🗑️ Deprecated
- **Priority:** 🟡 P2 - Medium
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-easy` agent variant that focuses on low-risk, high-confidence requirement slices first so that the agent preferentially picks low-hanging-fruit proposed requirements where it can make clean progress with minimal exploratory risk.

> Behavior absorbed into unified `rqmd` agent via `/go easy-win` (constraint argument). No separate agent variant needed.

<a id="rqmd-ext-027"></a>

### RQMD-EXT-027: Legacy-init installs local schema guidance into generated requirement indexes

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The generated `docs/requirements/README.md` or `requirements/README.md` to include the current local rqmd schema guidance that AI agents need during follow-up work so that the initialized repository contains a nearby, tool-owned schema reference instead of forcing humans or AI agents to rely on memory, external docs, or a missing side file.

<a id="rqmd-ext-028"></a>

### RQMD-EXT-028: Authored changelog maintenance skill

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-changelog` skill for maintaining `CHANGELOG.md` so that changelog work becomes a first-class authored workflow instead of an implicit side effect of generic docs cleanup.

<a id="rqmd-ext-029"></a>

### RQMD-EXT-029: General documentation-quality skill

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-docs` skill for documentation quality and structure work beyond simple drift correction so that README, requirement docs, bundle guidance, and other markdown can be improved using explicit standards for headings, clarity, jargon handling, page splitting, hyperlinks, and callouts instead of only being kept mechanically in sync.

<a id="rqmd-ext-030"></a>

### RQMD-EXT-030: Consistent cross-project AI workflow experience

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Shipped rqmd agents and skills to behave consistently across projects even when the requirement catalogs and priorities differ so that users build trust and familiarity with the AI workflows instead of relearning a different style in every repository.

<a id="rqmd-ext-031"></a>

### RQMD-EXT-031: Pinned context and decision notes workflow

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An `rqmd-pin` workflow for capturing important context, decisions, and quick-reference notes that should remain easy to find later so that useful insights do not disappear into chat history or scattered documentation during brainstorming and implementation.

<a id="rqmd-ext-032"></a>

### RQMD-EXT-032: Prompt-first single-agent bundle entrypoints

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to install focused prompt entrypoints such as `/go` alongside one primary implementation agent so that the default user experience can stay centered on `rqmd` instead of forcing users to choose among several agent variants up front.

<a id="rqmd-ext-033"></a>

### RQMD-EXT-033: Installed prompt suite for common rqmd actions

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a visible suite of focused prompts for common actions such as go, next, brainstorm, docs passes, pinning, and ship checks so that I can discover and invoke the most common rqmd workflows quickly without memorizing the lower-level skill names or choosing among multiple agents up front.

<a id="rqmd-ext-034"></a>

### RQMD-EXT-034: Count-aware go prompts and commit-per-slice variant

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Prompt arguments like `/go 10` to mean "work through up to 10 validated slices" and a separate `/commit-and-go` prompt for explicitly commit-authorized long runs so that long-running prompt usage can be more expressive than a single slice without forcing me to switch to a different agent variant.

<a id="rqmd-ext-035"></a>

### RQMD-EXT-035: Workspace bundle provenance and refresh metadata

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Each workspace bundle install to record which rqmd version and JSON schema version generated the local bundle files so that I can tell at a glance which rqmd release last installed or refreshed the prompts, skills, and instructions in that repository.

<a id="rqmd-ext-036"></a>

### RQMD-EXT-036: Single-agent-first bundle install defaults with explicit reinstall/upgrade commands

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Default `rqmd-ai install` behavior to keep one primary implementation agent and offer explicit `reinstall`/`upgrade` commands for bundle lifecycle operations so that normal bundle installs avoid surprising users with extra specialized agent files when they wanted the default single-agent experience.

<a id="rqmd-ext-037"></a>

### RQMD-EXT-037: Bundle bootstrap asks whether `/dev` and `/test` skills should support multiple platforms

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** Bundle bootstrap to ask whether generated `/dev` and `/test` skills should include cross-platform guidance so that rqmd does not silently lock a team into one shell or platform assumption when the repository actually needs broader support.
- Given a maintainer is generating repository-local `/dev` and `/test` skills through rqmd bundle bootstrap
- When the bootstrap interview determines or suspects that more than one platform may be relevant
- Then it should explicitly ask whether cross-platform support should be enabled for those generated skills unless the maintainer is confident the repository only targets a single platform
- And the generated guidance should either include the agreed cross-platform commands and caveats or clearly record that the repository is intentionally single-platform
- And Windows-oriented environments such as Git Bash should be treated as first-class cases rather than implicit Unix-only fallbacks.

<a id="rqmd-ext-038"></a>

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

<a id="rqmd-ext-039"></a>

### RQMD-EXT-039: Agent workflow metadata has one source of truth

- **Status:** 💡 Proposed
- **Priority:** 🟠 P3 - Low
- **Summary:** Canonical agent-workflow metadata to live in one maintained source of truth so that workflow instructions do not drift across the derived surfaces that humans and agents actually consume.
- Given the repository documents AI development workflow details across prompts, skills, settings, scripts, and markdown guidance
- When a maintainer updates a canonical workflow detail such as the preferred validation command, bootstrap path, or required toolchain
- Then that detail should be defined in one maintained source of truth and propagated to the derived docs or configuration surfaces that need it
- And the repository should include a repeatable check or generation path that catches drift before stale workflow instructions reach developers or agents.

<a id="rqmd-ext-040"></a>

### RQMD-EXT-040: Generated agent workflow entry point is the canonical agent execution surface

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** One generated agent-workflow entry point to be the canonical surface for routine agent actions so that agents do not need to discover or memorize a scattered set of shell commands, tasks, and skill-local conventions.
- Given a repository adopts rqmd-managed agent workflows
- When an agent needs to perform its primary repository tasks
- Then the repository should expose one stable agent-facing entry point with subcommands such as `preflight` and `validate`
- And repository-specific operations such as compile, focused test, broader test, docs verification, or other primary workflows should be reachable through that same maintained interface rather than ad hoc standalone commands
- And the interface should stay stable enough that prompts, skills, tasks, and automation can treat it as the primary execution contract for agent work.

<a id="rqmd-ext-041"></a>

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

<a id="rqmd-ext-045"></a>

### RQMD-EXT-045: Rename primary agent from `rqmd-dev` to `rqmd`

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The primary agent to be named `rqmd` instead of `rqmd-dev`, since it is the agent I interact with 95% of the time and the `-dev` suffix makes it sound like a secondary internal tool so that `rqmd` becomes the obvious, default agent name across all projects that install the bundle.

<a id="rqmd-ext-046"></a>

### RQMD-EXT-046: Auto-draft requirements during brainstorm and refine sessions

- **Status:** � Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The agent to automatically write solidified ideas into `docs/requirements/` as 💡 Proposed entries rather than asking me for permission each time so that when any session picks up the `/go` handoff prompt, the requirements it references already exist in the tracked docs and the implementation session has a clear contract to work from.

<a id="rqmd-ext-047"></a>

### RQMD-EXT-047: Brainstorm and refine modes resist jumping to implementation

- **Status:** � Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to actively resist writing code, tests, or implementation changes and instead focus on shaping, clarifying, and tracking requirements so that the brainstorm/refine workflow stays focused on *what* to build and *why*, with implementation deferred to a `/go` handoff in a focused implementation session.

<a id="rqmd-ext-048"></a>

### RQMD-EXT-048: Brainstorm and refine skills detect bug reports and offer bug template

- **Status:** � Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to recognize that I am describing a bug (keywords like "broken", "regression", "doesn't work", "used to work") and offer the Steps to Reproduce / Expected / Actual / Root Cause template from RQMD-CORE-043 instead of the user-story template so that bugs are drafted with the right shape from the start, with `type: bug` and an `affects:` cross-reference pre-filled when the parent requirement is identifiable.

<a id="rqmd-ext-049"></a>

### RQMD-EXT-049: `/bug` prompt for quick bug filing from chat context

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** To type `/bug` and have the agent automatically draft a tracked bug requirement from the conversation context so that filing a bug is zero-friction — no template hunting, no manual ID allocation, no asking permission — the agent just writes it to the appropriate domain file and tells me the ID.
- Given a chat session where a defect was discussed
- When the user invokes `/bug`
- Then the agent reviews conversation context, runs `rqmd-ai --json` to discover the next available ID and best-fit domain file, and writes a complete bug requirement using the Steps to Reproduce / Expected / Actual / Root Cause template with `type: bug` and an `affects:` cross-reference when identifiable.
- And the agent appends the requirement directly to the domain file without asking for confirmation.
- And the prompt file lives at `.github/prompts/bug.prompt.md` in the workspace and in the bundle at `src/rqmd/resources/bundle/.github/prompts/bug.prompt.md`.

<a id="rqmd-ext-069"></a>

### RQMD-EXT-069: `rqmd-init` scaffolds a `/release` skill during the interview

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer onboarding a project with `rqmd-init`, I want the interview to ask one release-workflow question (single repo or paired, preferred tag pattern) and generate a populated `skills/release/SKILL.md` alongside the `/dev` and `/test` skills, so that the "just release from CLI" path exists from day one without any manual skill authoring.
- Given the `rqmd-init` interview has reached the dev/test skill generation step
- When the agent discovers release scripts or CI/CD config (e.g. `Makefile`, `package.json` version field, `.github/workflows/release.yml`, any `*release*.sh`) or when the user answers "yes" to a prompted release-workflow question
- Then the agent generates `skills/release/SKILL.md` in focus-contract format, pre-filled with the confirmed release command, tag pattern, and repo targets
- And the skill is registered in `package.json` `chatSkills` if the repository is rqmd-vscode itself, or noted as a local skill for other repos
- And the interview skips the release step gracefully when no release signals are found and the user opts out

<a id="rqmd-ext-070"></a>

### RQMD-EXT-070: `rqmd-init` generates a `release.sh` stub for repos without a canonical release command

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer in the early rapid iteration phase of a project, I want `rqmd-init` to generate a minimal `scripts/release.sh` stub (single command: `gh release create vX.Y.Z --repo <owner>/<repo>`) when no release script already exists, so that an agent can cut a release autonomously by calling one command without manual setup.
- Given the `rqmd-init` interview has determined the release workflow and no existing `*release*.sh` or equivalent script is found
- When the user confirms they want a release stub generated
- Then the agent writes `scripts/release.sh` with a minimal `gh release create` invocation, executable (`chmod +x`), and a `# TODO: customize` header comment showing the repo slug to fill in

- And the generated `/release` skill references `./scripts/release.sh <version>` as the canonical release command
- And the stub is not generated if a release script already exists (no clobber)

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

<a id="rqmd-ext-061"></a>


### RQMD-EXT-061: `/go` nudges shaping before implementing unshaped requirements

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer using `/go` to implement a requirement, I want the agent to detect whether the requirement has been **shaped** (has acceptance criteria from at least one `/refine` pass) and nudge me to shape it first when it hasn't, so that I build the habit of knowing what I'm building — and why — before the agent builds it.
- **Shaping defined:** A requirement is "shaped" when it has acceptance criteria (Given/When/Then for features, Steps/Expected/Actual for bugs) and no unresolved open questions. Shaping is the "is the spec right?" check — distinct from verification ("is the build right?"), which happens after implementation.
- Given the user invokes `/go RQMD-XXX-NNN` on a 💡 Proposed requirement
- When the agent reads the requirement body and finds **no** acceptance criteria (no Given/When/Then, no Steps/Expected/Actual, no `## Done when`)

- Then the agent says: "This requirement hasn't been shaped yet — want me to `/refine` it first, or proceed anyway?" — one question, not a lecture
- And the user can proceed immediately with explicit confirmation (the nudge is friction, not a wall)
- And if the user accepts, the agent starts an interactive `/refine` shaping loop (see RQMD-EXT-063) before continuing to implementation
- And the nudge applies equally to features and bugs — an unshaped bug ("it's broken") gets the same prompt as an unshaped feature
- And requirements that already have acceptance criteria skip the nudge entirely — the agent trusts that shaping happened

<a id="rqmd-ext-062"></a>

### RQMD-EXT-062: Brainstorm items carry promotion status

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer maintaining `docs/brainstorm.md`, I want each idea to carry a visible promotion status so I can see at a glance which ideas are raw, which have been promoted to tracked requirements, and which were intentionally parked, so that raw ideas don't accidentally skip to implementation.
- Given a brainstorm section in `docs/brainstorm.md`
- When the agent or user adds, promotes, or parks an idea
- Then the idea heading or first line includes a status tag: `[raw idea]`, `[→ promoted: RQMD-XXX-NNN]`, or `[parked]`
- And the agent recognizes `[raw idea]` items as needing `/refine` before they can become requirements
- And promotion status is a convention (not enforced tooling) — agents follow it, humans may skip it

<a id="rqmd-ext-063"></a>

### RQMD-EXT-063: `/refine` is an interactive shaping loop, not a one-shot template

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer refining a requirement or bug, I want `/refine RQMD-XXX-NNN` to run an **interactive, iterative shaping loop** — pre-filling from context on the first pass, then tightening through conversation until the spec is clear enough to build — so that shaping feels faster than skipping it and I'm confident in what I'm about to implement.
- **Shaping model:** Each `/refine` pass adds clarity. The agent tracks maturity through the conversation:
  - **Pass 1 — Draft:** Agent reads brainstorm notes, codebase, and adjacent requirements; drafts acceptance criteria (Given/When/Then for features, Steps/Expected/Actual/Root Cause for bugs); presents as "Here's what I think you mean — edit anything that's off."
  - **Pass 2+ — Tighten:** Agent asks about edge cases, conflicts with existing requirements, and open questions. Each round narrows the spec.
  - **Shaped:** Agent confirms: "This looks shaped — acceptance criteria are clear, no open questions. Ready for `/go`?" The developer can accept or keep tightening.
- Given the user invokes `/refine RQMD-XXX-NNN` on any requirement (feature or bug, any status)
- When the agent reads the requirement summary
- Then the agent searches `docs/brainstorm.md` for related context, scans the codebase for files that would be touched, and reads adjacent requirements in the same domain file
- And the agent drafts acceptance criteria appropriate to the requirement type (Given/When/Then for features; Steps/Expected/Actual/Root Cause for bugs)
- And the draft is clearly marked as a proposal ("Here's what I'd suggest") — the developer approves, tweaks, or rejects each criterion
- And the agent asks follow-up questions about edge cases and ambiguities rather than guessing when context is thin
- And during shaping, the agent **actively invites first-person narratives** — "Walk me through what happens to you right now when you try to do X" — because turning-point insights emerge from user stories, not from template-filling
- And subsequent `/refine` calls on the same requirement continue the shaping loop (tighten, not restart)
- And when acceptance criteria are complete and no open questions remain, the agent declares the requirement "shaped" and offers to proceed to `/go`
- And the shaping confirmation includes a clickable link to the requirement (see RQMD-EXT-067) so the developer can review the final spec in one click

<a id="rqmd-ext-064"></a>

### RQMD-EXT-064: Post-implementation `/retro` prompt

- **Status:** 🗑️ Deprecated
- **Priority:** 🟡 P2 - Medium
- **Superseded by:** RQMD-EXT-071
- **Summary:** As a developer who just shipped a batch, I want a `/retro` prompt that reviews what happened and flags drift — untracked changes, skipped refinement, requirements that jumped Proposed → Implemented — so that I build awareness of where my process slipped without blocking velocity.

> Original sketch — fully shaped as RQMD-EXT-071 with drift categories, classification protocol, and session tree integration.

<a id="rqmd-ext-065"></a>

### RQMD-EXT-065: Session-start orientation shows backlog health

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer starting a new chat session in an rqmd workspace, I want the agent to proactively show backlog health (in-progress count, proposed count, recent drift indicators like "last session implemented 3 items without refinement") so that I get a quick orientation before diving in.

<a id="rqmd-ext-066"></a>

### RQMD-EXT-066: DocumentLinkProvider makes requirement IDs clickable in the editor

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer reading any file in VS Code (brainstorm.md, CHANGELOG.md, agent.md, skill files, code comments), I want every requirement ID to be a one-click link that opens the requirement in **markdown preview** scrolled to the right heading, so that navigating from any mention to the rendered spec replaces the current 5-step Ctrl+Shift+F workflow.
- Given a file is open in the VS Code editor and contains text matching a known requirement ID (e.g. `RQMD-EXT-063`)
- When the rqmd extension activates its DocumentLinkProvider
- Then every matching ID is rendered as a clickable link (underlined, Cmd/Ctrl-click)
- And clicking the link opens the requirement's source file in **markdown preview** and scrolls to the stable `<a id="rqmd-ext-063"></a>` anchor (see RQMD-EXT-068)
- And the ID→file mapping is built from `rqmd --json --non-interactive` output (which includes `source_file` per requirement), cached at workspace open, and refreshed via a file watcher on `docs/requirements/`
- And only IDs present in the `rqmd --json` index are linked — unknown IDs (typos, future IDs not yet indexed) produce no link, not a dead link
- And the feature works in editor, diff view, and search results
- And if markdown preview cannot resolve the anchor, the link falls back to opening the file in the editor at the heading line

<a id="rqmd-ext-067"></a>

### RQMD-EXT-067: Agent always emits requirement IDs as clickable markdown links

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer reading agent output in VS Code chat, I want **every** requirement ID the agent mentions to be a clickable link to the requirement source, so that I can jump to the spec with one click from any agent response — shaping confirmations, `/go` handoffs, `/retro` summaries, triage lists, everything.
- **VS Code chat constraint:** VS Code chat renders file links as button widgets, NOT blue hyperlinks. HTML anchor fragments (`#rqmd-ext-063`) produce NO link at all — only `#L<number>` line references work. The agent must look up the heading line number and use that.
- **Format — Option F (inline):** `RQMD-EXT-067 [spec](docs/requirements/bundle.md#L472)` — bare ID followed by a `[spec]` link with `#L<line>` fragment
- **Format — tables:** merge ID and link in one column: `RQMD-EXT-067 [spec](file.md#L<n>) | Title | Pri`
- Given the agent references a requirement ID anywhere in chat output
- When the agent knows the source file and line number for that ID (from reading the file or from `rqmd --json`)
- Then it emits: `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` — the ID as plain text, then a `[spec]` link with a `#L<line>` fragment pointing to the heading line
- And in tables, the ID and `[spec]` link share the Req column: `RQMD-EXT-063 [spec](file.md#L<n>)`
- And the agent determines the line number by reading the file (the `<a id>` tag or `###` heading line)
- And when the agent does not know the source file or line number, it emits the bare ID as fallback (graceful degradation)
- And the `<a id>` anchor tags (RQMD-EXT-068) are kept for GitHub, VS Code markdown preview, and DocumentLinkProvider — they serve all link surfaces except chat
- And the convention is encoded in the `rqmd.agent.md` instructions and the `/refine`, `/go`, and `/retro` skill files so all agent modes follow it

<a id="rqmd-ext-068"></a>

### RQMD-EXT-068: Stable anchor IDs on requirement headings

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer or agent linking to a specific requirement, I want each requirement heading to have a stable `<a id="rqmd-ext-nnn"></a>` anchor that survives title edits, so that cross-references from chat, brainstorm.md, CHANGELOG, and other files never break when a requirement's title is reworded.
- **Anchor authorship:** Dual approach — **(a)** agent convention writes anchors when creating/updating requirements, **(b)** `rqmd --verify-summaries` (or future `--fix-anchors`) heals any that were missed. Agent convention ships first; CLI healing can be deferred.
- Given a requirement heading like `

### RQMD-EXT-063: /refine is an interactive shaping loop`

- When the requirement is created or updated (by agent or human)
- Then an anchor tag `<a id="rqmd-ext-063"></a>` is present immediately before the heading
- And the anchor ID is the lowercase, hyphenated requirement ID (not derived from the title text)
- And links using `bundle.md#rqmd-ext-063` resolve correctly in VS Code markdown preview, GitHub rendered markdown, and the DocumentLinkProvider (RQMD-EXT-066)
- And existing requirements (~68 today) are backfilled with anchors in a one-time batch before this feature ships
- And the agent skill instructions (`rqmd-implement`, `rqmd-brainstorm`, `/refine`) include the convention: "always write `<a id>` before new requirement headings"

<a id="rqmd-ext-071"></a>

### RQMD-EXT-071: `/retro` prompt — structured post-work retrospective

- **Status:** � Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer who just finished a `/go` batch or a working session, I want a `/retro` prompt that reviews what happened, classifies session drift, and writes a retro node to the session tree, so that I build awareness of where my process worked or slipped and leave a clean handoff for the next session.

#### Design principle: CLI + Agent inseparable

- Heavy lifting (diffing requirement statuses, identifying changed files, cross-referencing) belongs in `rqmd` CLI. The agent interprets, presents, and asks follow-up questions.
- Future CLI support: `rqmd --json --diff-since <timestamp>` or `rqmd --json --changed` to surface requirements whose status changed since a given point. Until then, the agent manually diffs `git diff docs/requirements/` and parses status lines.

#### Data sources

- **Git:** `git diff --stat` (uncommitted) + `git log --oneline --since=<session-start>` (commits this session)
- **Requirement statuses:** `rqmd --json --non-interactive` (current snapshot; agent diffs against session tree's starting state)
- **Session tree:** Current `docs/sessions/` file — what the developer intended to work on (from `brainstorm`/`implementation` nodes)

#### Drift categories

- **Untracked changes** (⚠️ informational): Files in `git diff` with no requirement link. Could be fine (config, formatting) or a sign of vibe-coding. Agent flags; dev decides.
- **Skipped refinement** (⚠️ informational): Requirement went 💡→🔧 with no `/refine` session node. Not always wrong but the pattern should be visible.
- **Scope expansion** (📋 neutral): Requirements touched that weren't in the original `/go` slice. Not inherently bad — adjacent work discovered during implementation is natural. Agent reports factually without judgment.
- **Stalled work** (🔍 classify + confirm): A requirement named in an `implementation` node is still 💡 Proposed at retro time. Agent classifies with a best guess based on context, then confirms:
  - **Deferred:** pivoted to higher-priority work (agent can infer from session tree showing a pivot node)
  - **Blocked:** hit a dependency (agent can infer from conversation mentions of blockers)
  - **Cancelled:** decided not to do it (agent can infer from explicit "let's not" in conversation)
  - **Unknown:** no clear signal — agent asks: "You started EXT-075 but it's still 💡. Looks deferred — sound right?"

#### Agent classification protocol

- The agent SHOULD make a first-pass classification based on session tree, conversation context, and requirement statuses
- Present the classification with a confidence signal: "EXT-075 looks **deferred** — you pivoted to EXT-074 mid-session. Sound right?"
- Only ask open-ended "what happened?" when genuinely unsure
- Act on confirmed classifications: mark ⛔ Blocked, 🗑️ Deprecated, or leave as 💡 deferred

#### Output format

- `## What got done` — requirements completed with linked IDs

- `## Drift` — categorized drift items with severity emoji

- `## What's next` — suggested next actions (top 3)

- Stalled items appear with agent's classification and a confirm prompt

#### Session tree integration

- `/retro` writes a node of type `retro` to the current session file
- Node body contains compressed retro summary (full output goes to chat)
- If no session file exists, `/retro` creates one (slug: `retro`)
- Agent notifies: `> 📝 Recorded session node N007: "session retro" (retro)`

#### Edge cases

- **No git changes:** retro still runs against session tree + statuses. Output: "No code changes — this was a planning/shaping session."
- **No session tree file:** graceful degradation — drift detection uses only git + statuses, notes session tracking wasn't active.
- **Multiple `/retro` per session:** each writes a new `retro` node; earlier retros are preserved as history.

#### ## Done when

- Agent can run `/retro` and produce three-section output (got done / drift / next)
- Drift detection covers all 4 categories with appropriate severity
- Agent classifies stalled work with confidence signal before asking
- A `retro` node is written to the session file with inline notification
- Output uses linked requirement IDs
- Prompt lives at `prompts/retro.prompt.md`
- [RQMD-EXT-064](docs/requirements/bundle.md#rqmd-ext-064) is deprecated as superseded

<a id="rqmd-ext-072"></a>

### RQMD-EXT-072: `/catchup` prompt — re-orientation when returning

- **Status:** � Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer returning to a project after an absence (hours or days), I want a `/catchup` prompt that reads the previous session tree, `git status`, and backlog health and gives me a concise "here's where you left off" orientation, so that I can resume productively without re-reading chat history.
- Given a developer invokes `/catchup` or the agent detects a prolonged absence and suggests it
- When the agent runs the catch-up
- Then it reads the most recent session file from `docs/sessions/`, the current `git status`, and the backlog summary from `rqmd --json --non-interactive`
- And it presents: last session's retro summary (if it exists), what's in-progress, uncommitted changes, and the top 3 suggested next actions
- And it writes a session-tree node of type `catchup` to start the new session file
- And the prompt lives at `prompts/catchup.prompt.md` in the extension bundle

<a id="rqmd-ext-073"></a>

### RQMD-EXT-073: Retro nudge timer — time-aware coaching via VS Code setting

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer deep in a `/go` loop, I want the extension to track elapsed session time and gently suggest a `/retro` after a configurable interval, so that I build the habit of periodic reflection instead of heads-down marathons.
- Given the `rqmd.retroNudgeHours` VS Code setting is configured (default: 2)
- When the developer has been in an active session for longer than the configured interval without invoking `/retro`
- Then the extension appends a subtle tip to the next agent response: `> 💡 tip: You've been going for ~Nh — good time for /retro?`
- And the nudge appears at most once per interval (not on every response)
- And setting `rqmd.retroNudgeHours` to `0` disables the nudge entirely
- And the timer resets after a `/retro` invocation or a detected idle gap (>1h with no chat messages)
- And when the session is long (e.g. >4h or past midnight local), the agent may shift to a warmer, playful tone — casual language, Python-flavoured easter eggs, gentle humour — signalling "I see you, please rest" without being preachy

<a id="rqmd-ext-074"></a>

### RQMD-EXT-074: Session tree — navigable conversation structure in `docs/sessions/`

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer who wants to revisit earlier decisions or understand "how did we get here?", I want each working session to produce a structured tree of decision/insight/topic nodes in a git-tracked markdown file, so that the agent and I can navigate the conversation history by walking the tree rather than re-reading flat chat transcripts.

#### File format

- One file per session: `docs/sessions/YYYY-MM-DD-<slug>.md` where slug is 2-3 words from the first topic (e.g. `2026-04-14-retro-catchup-brainstorm.md`)
- Session file opens with `# Session: <title>` and a `<!-- session-start: ISO-timestamp -->` comment

- Nodes are `##` headings within the file, sequentially numbered: `## N001:`, `## N002:`, etc.

#### Node schema

- **Type** (required): `brainstorm` | `decision` | `insight` | `turning-point` | `implementation` | `retro` | `catchup`
- **Parent** (required): `—` for roots, `N001` etc. for children. Always exactly one parent (tree structure).
- **Related** (optional): Cross-links to other nodes, files, or requirement IDs. Makes the tree a DAG when present.
- **Reqs** (optional): Requirement IDs touched or discussed at this node.
- **Time** (required): ISO 8601 timestamp.
- **Body** (required): 1-3 sentences max. What happened, what was decided/realized. Not a transcript. Use `See also:` link if more context exists elsewhere.
- **Children are implicit** — derived from `Parent:` references. No `Children:` field (avoids duplicate state that drifts).

#### What triggers a new node

- A decision is made → `decision`
- An insight crystallizes → `insight`
- The user or agent pivots direction → `turning-point`
- A brainstorm topic opens → `brainstorm`
- A `/go` batch starts → `implementation`
- `/retro` runs → `retro`
- `/catchup` runs → `catchup`
- **NOT triggers:** routine file edits, searches, test runs, reading files — only semantically meaningful moments

#### Automatic writing with notification

- The agent writes nodes **automatically** without asking permission
- After writing a node, the agent informs the user inline: `> 📝 Recorded session node N003: "conversation structure > summary" (insight)`
- The notification is a single `>` blockquote line — lightweight, skimmable, not blocking

#### "Go back" navigation protocol

- Given the user says "wait, let's go back to where we decided X"
- The agent reads the current session file and finds the matching node (by keyword, node number, or requirement ID)
- Traces the path from the current node to the target via `Parent:` chain
- Reports: "We got here via N001 → N003 → N005. Recommend reconsidering from N003 or N005."
- Creates a **new** node branching from the target's parent — the old branch stays as history, not overwritten
- Reconsiderations are naturally recorded as branches in the tree

#### Session file lifecycle

- **Created by:** first node of a new session (often `/catchup` or first `/brainstorm`)
- **Multiple per day:** yes — one file per session, not per day
- **Closed by:** `/retro` writes a final `retro` node, or the file simply stops growing
- **Git-tracked:** always committed alongside the work it describes
- **Session boundary detection:** TBD — to be shaped separately (see open question below)

#### ## Done when

- Agent can create a `docs/sessions/` file and write nodes to it during a working session
- Each node follows the schema above with required fields
- Agent notifies user of each recorded node via inline `>` blockquote
- Agent can trace `Parent:` chains and report navigation paths when user asks to "go back"
- `/retro` and `/catchup` both read and write to session files
- `rqmd-history` skill (RQMD-EXT-075) teaches the agent the full protocol

#### Open

- Session boundary detection: what starts a new session file? `/catchup`? Idle gap? Explicit command? Needs its own brainstorm pass.

<a id="rqmd-ext-075"></a>

### RQMD-EXT-075: `rqmd-history` skill — session tree reading and navigation

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As an agent working in an rqmd session, I need a skill that teaches me how to read, write, and navigate session tree files, so that `/retro`, `/catchup`, and conversational "go back to X" navigation all work consistently against the same data structure.
- Given the `rqmd-history` skill is loaded
- When the agent needs to read, write, or navigate session tree nodes
- Then the skill defines: the session file location (`docs/sessions/`), the node schema, when to create new nodes (decisions, insights, turning points — not routine edits), how to trace parent/child paths, and the "go back" protocol for revisiting earlier decisions
- And the skill populates `skills/rqmd-history/SKILL.md` in the extension bundle
- And the skill teaches the agent to keep session files concise — only decisions, insights, and turning points, not every search or edit

<a id="rqmd-ext-076"></a>

### RQMD-EXT-076: Domain Term Introduction Convention

- **Status:** � Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer reading rqmd docs, requirement text, or agent chat output, I want domain-specific terms ("Done-When", "Session Tree", "User Story", "Smoke Path", etc.) introduced and capitalised consistently, so that I can recognise terms of art at a glance and distinguish them from plain English.
- Given a new rqmd domain term appears for the first time on a page or in a conversation
- When the author (human or agent) writes it
- Then the term is double-quoted and Title Cased on first use: "Done-When", "Session Tree", "User Story"
- And subsequent uses on the same page/conversation drop the quotes but keep Title Case: Done-When, Session Tree, User Story
- And multi-word terms without a hyphen stay spaced Title Case: User Story, Smoke Path, Session Tree
- And compound-modifier terms stay hyphenated as a unit: Done-When, Session-Start
- And headings use Title Case without quotes: `#### Done-When Criteria`

- And CLI / JSON keys remain snake_case: `done_when`, `session_tree`
- And a canonical glossary file at `docs/glossary.md` lists every rqmd domain term with a one-line definition and its canonical capitalisation
- And the convention is codified in `docs/doc-standards.md` alongside the existing acronym/jargon rule
- And the `rqmd` agent instructions reference the convention so agents follow it in chat output

<a id="rqmd-ext-077"></a>

### RQMD-EXT-077: Inbox file convention and `/brainstorm` quick-capture mode

- **Status:** � Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer with a fleeting idea — especially late at night or mid-flow — I want a zero-ceremony way to capture it into a git-tracked "Inbox" so that I can dump ideas without context-switching into organise mode, and triage them later when I'm sharp.
- Given an rqmd-managed project
- When the developer wants to capture an idea quickly
- Then `docs/inbox.md` serves as a flat, append-only capture file with a `# Inbox` heading

- And each item is an unordered list entry (`- idea text here`)
- And multi-line ideas use nested unordered list items for sub-points (not blank-line separation)
- And `/brainstorm` detects short input (single sentence, "quick note:", "inbox:") and appends to `docs/inbox.md` instead of running a full exploration
- And after appending, the agent responds with a single-line confirmation: `> 📥 Added to inbox (N items pending triage)`
- And `/triage` gains an inbox-first mode: when `docs/inbox.md` has items, it offers to sweep them before backlog triage
- And `/catchup` and `/retro` report the inbox count: "You have N un-triaged inbox items"
- And the inbox convention works in any rqmd-enabled project (it's just a file + prompt behaviour in the extension bundle)

<a id="rqmd-ext-078"></a>

### RQMD-EXT-078: `rqmd: Quick Capture` VS Code command

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer who wants the absolute lowest-friction idea capture, I want a VS Code command palette entry (and keybinding target) that pops an input box and appends my text to `docs/inbox.md`, so that I never leave my current file or open the chat panel just to jot down an idea.
- Given the rqmd extension is installed and a workspace has a `docs/` directory
- When the developer triggers `rqmd: Quick Capture` from the command palette (or a keybinding)
- Then VS Code shows a single-line input box with placeholder text: "Quick idea — appends to docs/inbox.md"
- And on submit, the extension appends a `- <text>` line to `docs/inbox.md` (creating the file with `# Inbox\n\n` header if it doesn't exist)

- And a brief VS Code information message confirms: "📥 Added to inbox"
- And pressing Escape cancels without writing
