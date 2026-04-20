# Agent Execution Requirements

Scope: Agent workflow entry points, preflight readiness checks, `/dev` and `/test` skill scaffolding and delegation.

<!-- acceptance-status-summary:start -->
Summary: 3💡 4🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-008"></a>

### RQMD-EXT-008: Project-specific dev and test skill scaffolding

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Bundle bootstrap to help generate project-local `dev` and `test` skills tailored to that repository's actual commands and workflows so that the installed `rqmd-dev` agent can delegate build, run, smoke-test, and test behavior to project-specific skills instead of relying on generic assumptions.

<a id="rqmd-ext-010"></a>

### RQMD-EXT-010: rqmd-dev delegation to project dev and test skills

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** `rqmd-dev` guidance to explicitly depend on repository-specific `dev` and `test` skills when they exist so that implementation agents know where to find the canonical project commands for building, running, smoke-testing, and validating the work under development.

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

