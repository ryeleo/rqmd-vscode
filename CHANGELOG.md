# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **⚠️ Note:** Version numbers are intended to stay in sync with the `rqmd` Python CLI package.

<a id="unreleased"></a>
## [Unreleased]

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
- 12 prompts contributed via `chatPromptFiles`: `/brainstorm`, `/bug`, `/commit`, `/commit-and-go`, `/feedback`, `/go`, `/next`, `/pin`, `/polish-docs`, `/refactor`, `/refine`, `/ship-check`.
- 16 skills contributed via `chatSkills`: `rqmd-brainstorm`, `rqmd-bundle`, `rqmd-changelog`, `rqmd-doc-sync`, `rqmd-docs`, `rqmd-export-context`, `rqmd-feedback`, `rqmd-history`, `rqmd-implement`, `rqmd-init`, `rqmd-init-legacy`, `rqmd-pin`, `rqmd-status-maintenance`, `rqmd-telemetry`, `rqmd-triage`, `rqmd-verify`.
- 2 agents contributed via `chatAgents`: `rqmd` (requirements and project management) and `rqmd-dev` (implementation).
