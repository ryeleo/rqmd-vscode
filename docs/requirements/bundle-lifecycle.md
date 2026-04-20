# Bundle Lifecycle Requirements

Scope: Bundle install, upgrade, versioning, provenance metadata, and release workflow.

<!-- acceptance-status-summary:start -->
Summary: 3💡 6🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-001"></a>

### RQMD-EXT-001: Installable AI agent/skill instruction bundle

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** Rqmd to install a standard agent/skill instruction bundle into the workspace so that AI agents have a consistent contract for JSON modes, workflow sequencing, and requirement/doc update expectations.

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

<a id="rqmd-ext-084"></a>

### RQMD-EXT-084: Agent instructions auto-fix metadata mismatch

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer using rqmd agents after upgrading the CLI tool, I want the agent to detect metadata version mismatch and automatically run `rqmd --sync-index-metadata --force-yes --non-interactive` so that I don't accumulate version drift or get nagged by warnings throughout the session.

- Given the `rqmd` agent runs any `rqmd` CLI command during a session
- When the CLI stderr or JSON output (see RQMD-CORE-049) indicates a metadata mismatch between the recorded and running rqmd versions
- Then the agent automatically runs `rqmd --sync-index-metadata --force-yes --non-interactive` to fix it
- And the agent reports the fix with a one-line notice: `"> ℹ️ Synced index metadata (rqmd 0.2.6 → 0.2.7)"`
- And the fix happens at most once per session (not repeated on every command)
- And the convention is encoded in `copilot-instructions.md` and the `rqmd` agent instructions so all agent modes follow it
- And `/catchup` proactively checks for the mismatch as part of its session-start orientation

<a id="rqmd-ext-085"></a>

### RQMD-EXT-085: Preflight step auto-syncs stale index metadata

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer using the `agent-workflow.sh preflight` readiness check, I want preflight to detect and auto-fix stale index metadata so that version drift is resolved before an agent starts working rather than surfacing as a mid-session warning.

- Given the repository has an `agent-workflow.sh` with a `preflight` subcommand (RQMD-EXT-038/040)
- When preflight runs its readiness checks
- Then it checks whether `rqmd --json --non-interactive` output contains a `"metadata_mismatch"` key (RQMD-CORE-049)
- And if a mismatch is detected, preflight runs `rqmd --sync-index-metadata --force-yes --non-interactive` and reports: `"✓ Synced index metadata (rqmd X.Y.Z → A.B.C)"`
- And if no mismatch, preflight reports: `"✓ Index metadata current"`
- And the check runs after rqmd availability verification but before any validation steps

<a id="rqmd-ext-086"></a>

### RQMD-EXT-086: `/rqmd-release` skill — universal release guardrails

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer using rqmd agents to cut a release, I want a bundled `/rqmd-release` skill that drives the universal release ceremony (stamp changelog, confirm versions, validate, tag the right commit) so that every rqmd-managed project gets release discipline without writing a custom skill from scratch.

- Given a repository has rqmd installed and a CHANGELOG following Keep a Changelog format
- When the agent invokes `/rqmd-release <version>`
- Then the skill runs `rqmd release --preflight` (RQMD-CORE-052) and stops if any check fails
- And the skill runs `rqmd release --stamp <version> --write` (RQMD-CORE-053) to roll the changelog and bump version files
- And the skill bumps prompt description versions if `prompts/*.prompt.md` are present
- And the skill runs the repo's validation (`agent-workflow.sh validate` or equivalent) and stops if it fails
- And the skill commits, tags, and pushes (with user confirmation for the push)
- And the skill defers to a repo-specific `/release` skill for any additional steps (paired repos, registry publishing, etc.) when one exists
- And the skill can be run as a dry-run (`/rqmd-release 0.3.0 --dry-run`) that previews all steps without writing

