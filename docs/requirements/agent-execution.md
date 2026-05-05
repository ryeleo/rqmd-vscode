# Agent Execution Requirements

Scope: Agent workflow entry points, preflight readiness checks, `/dev` and `/test` skill scaffolding and delegation.

<!-- acceptance-status-summary:start -->
Summary: 4💡 5🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ai-exec-001"></a>

### RQMD-AI-EXEC-001: Project-specific dev and test skill scaffolding

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Bundle bootstrap to help generate project-local `dev` and `test` skills tailored to that repository's actual commands and workflows so that the installed `rqmd-dev` agent can delegate build, run, smoke-test, and test behavior to project-specific skills instead of relying on generic assumptions.

<a id="rqmd-ai-exec-002"></a>

### RQMD-AI-EXEC-002: rqmd-dev delegation to project dev and test skills

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** `rqmd-dev` guidance to explicitly depend on repository-specific `dev` and `test` skills when they exist so that implementation agents know where to find the canonical project commands for building, running, smoke-testing, and validating the work under development.

<a id="rqmd-ai-exec-003"></a>

### RQMD-AI-EXEC-003: Bundle bootstrap asks whether `/dev` and `/test` skills should support multiple platforms

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** Bundle bootstrap to ask whether generated `/dev` and `/test` skills should include cross-platform guidance so that rqmd does not silently lock a team into one shell or platform assumption when the repository actually needs broader support.
- Given a maintainer is generating repository-local `/dev` and `/test` skills through rqmd bundle bootstrap
- When the bootstrap interview determines or suspects that more than one platform may be relevant
- Then it should explicitly ask whether cross-platform support should be enabled for those generated skills unless the maintainer is confident the repository only targets a single platform
- And the generated guidance should either include the agreed cross-platform commands and caveats or clearly record that the repository is intentionally single-platform
- And Windows-oriented environments such as Git Bash should be treated as first-class cases rather than implicit Unix-only fallbacks.

<a id="rqmd-ai-exec-004"></a>

### RQMD-AI-EXEC-004: Agent preflight verifies repository readiness before implementation

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** A canonical agent-facing workflow entry point that exposes a `preflight` readiness check so that missing prerequisites are surfaced before an agent burns time failing inside the middle of a batch.
- Given a developer wants to hand the repository to one or more AI agents for implementation work
- When the repository's agent workflow entry point is run in `preflight` mode at the start of that workflow
- Then it should verify the canonical repository prerequisites such as expected shell tooling, rqmd availability, generated or maintained workspace guidance files, and any project-specific validation hooks
- And the workflow surface should be simple enough that agents and humans can treat it as the single obvious starting point instead of hunting across multiple scripts or tasks
- And it should report missing or stale prerequisites with precise fixes instead of letting the failure surface later inside an agent run
- And it should exit with a machine-readable success or failure result, including per-check status and remediation guidance, so prompts, tasks, and automation can gate on the same readiness check.

<a id="rqmd-ai-exec-005"></a>

### RQMD-AI-EXEC-005: Agent workflow metadata has one source of truth

- **Status:** 💡 Proposed
- **Priority:** 🟠 P3 - Low
- **Summary:** Canonical agent-workflow metadata to live in one maintained source of truth so that workflow instructions do not drift across the derived surfaces that humans and agents actually consume.
- Given the repository documents AI development workflow details across prompts, skills, settings, scripts, and markdown guidance
- When a maintainer updates a canonical workflow detail such as the preferred validation command, bootstrap path, or required toolchain
- Then that detail should be defined in one maintained source of truth and propagated to the derived docs or configuration surfaces that need it
- And the repository should include a repeatable check or generation path that catches drift before stale workflow instructions reach developers or agents.

<a id="rqmd-ai-exec-006"></a>

### RQMD-AI-EXEC-006: Generated agent workflow entry point is the canonical agent execution surface

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** One generated agent-workflow entry point to be the canonical surface for routine agent actions so that agents do not need to discover or memorize a scattered set of shell commands, tasks, and skill-local conventions.
- Given a repository adopts rqmd-managed agent workflows
- When an agent needs to perform its primary repository tasks
- Then the repository should expose one stable agent-facing entry point with subcommands such as `preflight` and `validate`
- And repository-specific operations such as compile, focused test, broader test, docs verification, or other primary workflows should be reachable through that same maintained interface rather than ad hoc standalone commands
- And the interface should stay stable enough that prompts, skills, tasks, and automation can treat it as the primary execution contract for agent work.

<a id="rqmd-ai-exec-007"></a>

### RQMD-AI-EXEC-007: `/dev` and `/test` skills can defer to a canonical agent-invocable interface

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

<a id="rqmd-ai-exec-008"></a>

### RQMD-AI-EXEC-008: Mandatory slice closeout checklist — CHANGELOG, docs, and status sync

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer who relies on rqmd agents to keep the repo in sync, I want every implementation slice to complete a mandatory before-done checklist (requirement status → CHANGELOG → README → smoke check) so that agents never silently skip changelog entries or leave docs stale after making code changes.
- Given an agent completes any implementation change — code, prompt, skill, agent file, or config
- When the agent considers the slice done
- Then it must complete these steps before writing its closeout handoff, in order:
  1. **Requirement status** — update the `### RQMD-` heading in `docs/requirements/*.md` to 🔧 Implemented; re-run `rqmd --verify-summaries --non-interactive`
  2. **CHANGELOG** — add an entry under `## [Unreleased]` in `CHANGELOG.md`; use Added/Changed/Fixed/Removed categories; include requirement ID `[spec]` links for any tracked change
  3. **README** — if user-visible or agent-visible behavior changed, update README
  4. **Smoke check** — run the project's smoke path
- And if any step is skipped, the slice is explicitly **not done** — the agent must say so rather than delivering a partial closeout
- And this checklist is codified in the `rqmd` agent definition (`agents/rqmd.agent.md`) as a named section separate from handoff-format instructions, so it cannot be confused with output style guidance
- And the checklist applies to both `rqmd-cli` and `rqmd-vscode` when working in a multi-root workspace — each repo gets its own CHANGELOG entry

<a id="rqmd-ai-exec-009"></a>

### RQMD-AI-EXEC-009: Prefer VS Code-native execution surfaces over raw shell

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer using rqmd inside VS Code, I want the agent to prefer VS Code's native execution surfaces — Test Explorer, `tasks.json`, and `launch.json` — over shelling out to raw CLI commands, so that runs happen in the editor's normal output channels (with debugging, problem matchers, and one-click rerun) instead of disposable terminal sessions, and so that what the agent learns about a project is recorded back into the project-local `/dev` and `/test` skills.
- **Tool preference order** (highest to lowest):
  1. **Tests:** VS Code Test Explorer (the `runTests` tool) when the project has a discoverable test framework (pytest, vitest, jest, mocha, go test, etc.).
  2. **Run / build / smoke / launch:** `tasks.json` entries via the `run_task` tool when a matching label exists.
  3. **Debug-attach style requests:** `launch.json` configurations, surfaced as a suggestion ("there's a `launch.json` entry `debug rqmd CLI` — run that instead?") rather than silently shelling out.
  4. **Raw shell** via `run_in_terminal` only when none of the above match, or when the user explicitly asks for the shell command.
- Given a developer asks the rqmd agent to run tests, run a build, start a dev server, or debug something
- When the workspace contains a relevant VS Code-native surface (Test Explorer-discoverable tests, a `tasks.json` label that matches the request, or a `launch.json` config that matches)
- Then the agent prefers that surface over `run_in_terminal`, and names the surface it picked in one short line ("running via Test Explorer", "running task `local smoke`", "matching `launch.json` config: `debug rqmd CLI` — run it?")
- And when the agent uses a VS Code-native surface for the first time on a given repo, it records the discovery in the project-local `/dev` or `/test` skill so the next session does not have to re-discover it
- And the agent does not silently fall back to a raw shell command when a matching task or launch config exists — falling back is a deliberate choice the agent calls out
- And the convention is encoded in the `rqmd` agent definition (`agents/rqmd.agent.md`) and surfaced in the `rqmd-init` skill so generated `/dev` and `/test` skills mention any discovered `tasks.json` and `launch.json` entries
- And `rqmd-init` scans `.vscode/tasks.json` and `.vscode/launch.json` during the interview and includes the relevant labels in the generated `/dev` and `/test` skill bodies

