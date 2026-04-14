# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **⚠️ Note:** Version numbers are intended to stay in sync with the `rqmd` Python CLI package.

<a id="unreleased"></a>
## [Unreleased]

<a id="v0-2-5"></a>
## [0.2.5] - 2026-04-14

### Added

- `@rqmd` chat participant registered (`RQMD-PACKAGING-017`). Subcommands `brainstorm`, `triage`, `go`, `next`, `refine`, `commit`, `verify`, `pin`, `feedback`, and `docs` appear in Copilot Chat autocomplete. Each subcommand loads its skill or prompt file as system instructions and forwards the request to the Copilot-selected model.

### Changed

- Deleted `agents/rqmd-dev.agent.md` — `rqmd.agent.md` is the single agent covering all work modes. The dev sub-agent was vestigial since RQMD-EXT-045.
- Removed `rqmd-history` skill reference from `package.json` — file did not exist.
- All skills: purged all `rqmd-ai` CLI command references (the `rqmd-ai` entrypoint was removed from the CLI in rqmd-cli `980fd5e`). Replaced with current `rqmd` equivalents: `rqmd --json --non-interactive`, `rqmd --status proposed --json --non-interactive`, `rqmd --update ID=STATUS`, `rqmd --scaffold`.
- `rqmd-bundle` skill: deleted — no user-facing bundle install or management workflow exists in the extension-native model; extension ships content automatically.
- `rqmd-init` skill: rewritten as AI-driven structured interview — agent explores repo context, conducts multi-choice interview with smart defaults pre-selected, generates `/dev` and `/test` skills, and seeds requirements catalog; existing-repo guidance merged in from `rqmd-init-legacy`.
- `rqmd-init-legacy` skill: deleted — guidance merged into `rqmd-init`.
- `rqmd-telemetry` skill: updated command discovery example and test pipeline to reference `rqmd` instead of `rqmd-ai`.
- `prompts/refine.prompt.md`: removed "recommend cheaper implementation agent" — handoffs target a capable fork of the same agent.
- `docs/requirements/bundle.md` RQMD-EXT-046: removed "cheaper agent" framing from summary.
- `docs/requirements/bundle.md` RQMD-EXT-047: removed "(typically cheaper)" from handoff session description.
- `agents/rqmd.agent.md`: added "complete and concise" handoff standard to Closeout — handoffs are 3 bullets max (ID + one-line state + open question if any).
- Skills `rqmd-implement`, `rqmd-triage`, `rqmd-verify`, `rqmd-changelog`, `rqmd-doc-sync`, `rqmd-status-maintenance`, `rqmd-pin`, `rqmd-brainstorm`: converted to focus-contract format per `docs/skill-format.md` — charter + `## Done when` + `## Edge cases` replaces `## Workflow` + `## Constraints`.
- `rqmd-brainstorm` skill: fixed `section_targets` and `default_target_file` to use rqmd-vscode domain files (`bundle.md`, `extension.md`) instead of rqmd-cli files (`ai-cli.md`, `core-engine.md`, etc.).
- Skills `rqmd-telemetry`, `rqmd-docs`, `rqmd-feedback`: trimmed `metadata.workflow` and `examples` arrays; reference body content kept.
- `rqmd-docs` skill: restructured body — added `## Done when` + `## Edge cases` preamble; renamed `## Workflow` to `## Style guide`; removed `## Constraints`.
- `docs/requirements/bundle.md` RQMD-EXT-025: marked 🗑️ Deprecated — behavior absorbed into unified `rqmd` agent via `/go N`. Superseded by RQMD-EXT-034.
- `docs/requirements/bundle.md` RQMD-EXT-026: marked 🗑️ Deprecated — behavior absorbed into unified `rqmd` agent via `/go easy-win`. Superseded by RQMD-EXT-034.
- `rqmd-export-context` skill: converted to focus-contract format — charter, `## Done when`, `## Edge cases`; current `rqmd` CLI commands documented (`rqmd --json --non-interactive`, `rqmd --status proposed --json --non-interactive`).

### Added (batch 3)

- `docs/skill-format.md`: focus-contract format specification — canonical reference for the charter + done-when + edge-cases skill structure, with before/after examples for 5 skills.
- `docs/brainstorm.md`: single-smart-agent refactor planning notes for rqmd-vscode.

### Removed

- `skills/rqmd-bundle/` — deleted; bundle content ships with the VS Code extension automatically, no workspace install step needed.
- `skills/rqmd-init-legacy/` — deleted; existing-repo guidance merged into `rqmd-init`.

<a id="v0-2-4"></a>
## [0.2.4] - 2026-04-10

### Added

- Requirements RQMD-EXT-056–060: self-healing rqmd bootstrap proposals — same-major version policy, VS Code notification flow, unified shim entrypoint, install lock + session debounce, and reason-code telemetry.
- `bootstrap.js`: extension-host bootstrap module — checks for rqmd at startup and command invocation, installs uv and/or rqmd if missing, persists installed major to VS Code global state for same-major version pinning (RQMD-EXT-056, RQMD-EXT-058).
- `scripts/rqmd-bootstrap.sh`: shell shim for terminal and CI fallback — same bootstrap flow as `bootstrap.js`, state persisted to `$XDG_STATE_HOME/rqmd/installed-major` (RQMD-EXT-058).
- `bootstrap.js`: `_log()` + Output channel (`rqmd bootstrap`) emits structured reason codes (`already-present`, `installed-rqmd`, `installed-uv-and-rqmd`, `install-failed`, `major-mismatch`) on every bootstrap invocation (RQMD-EXT-060).
- `tests/bootstrap.test.js`: 6 unit tests covering all bootstrap paths — rqmd present, rqmd missing + uv present, both missing, major mismatch, offline failure, concurrent calls (RQMD-EXT-060).
- `package.json`: added `"test": "node --test tests/bootstrap.test.js"` script.

### Changed

- `bootstrap.js`: added concurrency lock (`_bootstrapInFlight` Promise) so concurrent `ensureRqmd()` callers share one in-flight install instead of racing; added session debounce so the “Installing rqmd…” notification fires at most once per extension-host lifetime; extracted `runRqmd(context, args, opts)` helper that bootstraps then opens a terminal and replays the original command automatically (RQMD-EXT-059).
- `scripts/rqmd-bootstrap.sh`: added `flock`-based filesystem lock so concurrent terminal launches wait rather than racing to install.
- `extension.js`: `rqmd.initProject` now calls `runRqmd()` instead of raw terminal open, so bootstrap + rerun is handled automatically.
- README docs sync: `/next` is now documented as orchestration-first (recommend + `/go` handoff, implement when asked), agent table duplication is removed, and version-sync text now reflects `0.2.4`.
- Prompt rename: `/polish-docs` is now `/docs-polish` (same behavior, clearer command naming).
- `/next` prompt reworked to prefer planning and `/go` handoff over immediate implementation; reminds users to commit before switching slices when the worktree is dirty.
- Agent-level worktree-health rule added to `rqmd.agent.md`: check `git status` and recommend committing (or stashing) before handing off to the next slice.

<a id="v0-2-3"></a>
## [0.2.3] - 2026-04-09

### Changed

- Primary agent renamed from `rqmd-dev` to `rqmd` (`RQMD-AI-056`). The `rqmd-dev.agent.md` file is removed; `rqmd.agent.md` is expanded to cover the full range of rqmd work — brainstorm, refine, implement, and ship — in one merged agent.
- All bundled prompt `agent:` frontmatter updated from `rqmd-dev` to `rqmd`.
- Anti-hallucination rule added to `rqmd.agent.md`: agents must never invent or calculate requirement IDs — always read `next_id` from `rqmd --json` output.

<a id="v0-2-2"></a>
## [0.2.2] - 2026-04-09

### Changed

- Added a public extension README with installation guidance, command overview, agent/skill summary, and a clearer explanation of how the VS Code extension fits with the rqmd CLI.
- Marketplace publish now calls `scripts/ensure_release_tag.py` (with `scripts/validate_release_tag.py` retained as a compatibility wrapper). The ensure script updates `package.json` `version` from the tag mapping before publish (`vX.Y.ZrcN` maps to `X.Y.Z`) and still enforces versioned changelog sections for stable tags.
- Public extension metadata and README copy now focus on workflow and onboarding instead of calling out internal packaging details like whether files are written to the project.

<a id="v0-2-1"></a>
## [0.2.1] - 2026-04-09

### Added

- GitHub Actions workflow (`publish-marketplace.yml`) publishes to the VS Code Marketplace on the same tag convention as `rqmd-cli` — stable release on GitHub Release event, pre-release on `v*rc*` tag push.
- `scripts/validate_release_tag.py` enforces that `package.json` version matches the release tag before publish, mirroring the validator in `rqmd-cli`.
- Marketplace publish now runs in the `vscode-marketplace` GitHub Environment so `VSCE_PAT` can be managed with environment-scoped controls instead of repository-wide secrets.
- **"rqmd: Initialize Project"** command palette action (`RQMD-PACKAGING-016`). Runs `rqmd init` in an integrated terminal and prompts the user to paste the output into Copilot Chat to complete the guided interview flow. Only project-specific files (`/dev`, `/test` skills, starter requirement docs) are written to `.github/`; shared rqmd defaults remain in the extension.
- `rqmd-diagram` skill for authoring and validating Mermaid diagrams in markdown. Includes a comprehensive table of 16 diagram use cases (state/lifecycle, UI flows, protocols, call graphs, data pipelines, decision trees, entity relationships, infrastructure, class hierarchies, async/concurrency, error recovery, user journeys, CI/CD, permissions, game logic, caching) with recommended Mermaid diagram types for each. Uses `mmdc` purely as a linter; recommends inline `mermaid` blocks over external `.mmd` files.
- Both `rqmd` and `rqmd-dev` agents now include compact "When to suggest diagrams" guidance with array-list notation pointing to the full use-case table in `/rqmd-diagram`. Agents will proactively offer diagrams whenever the problem touches state machines, protocols, data pipelines, or any of the catalogued scenarios.

<a id="v0-2-0"></a>
## [0.2.0] - 2026-04-09

### Added

- Initial extension scaffold (`RQMD-PACKAGING-013`). Distributes the rqmd AI bundle via VS Code Copilot Chat contribution points — no files written to `.github/`.
- 12 prompts contributed via `chatPromptFiles`: `/brainstorm`, `/bug`, `/commit`, `/commit-and-go`, `/feedback`, `/go`, `/next`, `/pin`, `/docs-polish`, `/refactor`, `/refine`, `/ship-check`.
- 16 skills contributed via `chatSkills`: `rqmd-brainstorm`, `rqmd-bundle`, `rqmd-changelog`, `rqmd-doc-sync`, `rqmd-docs`, `rqmd-export-context`, `rqmd-feedback`, `rqmd-history`, `rqmd-implement`, `rqmd-init`, `rqmd-init-legacy`, `rqmd-pin`, `rqmd-status-maintenance`, `rqmd-telemetry`, `rqmd-triage`, `rqmd-verify`.
- 2 agents contributed via `chatAgents`: `rqmd` (primary — brainstorm, refine, implement, and ship).
