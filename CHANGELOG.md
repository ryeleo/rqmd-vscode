# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

> **⚠️ Note:** Version numbers are intended to stay in sync with the `rqmd` Python CLI package.

<a id="unreleased"></a>

## [Unreleased]

<a id="v0-2-10"></a>

## [0.2.10] - 2026-04-19

### Added

- `/bootstrap` prompt (`prompts/bootstrap.prompt.md`): user-facing slash command that triggers the `rqmd-init` structured interview for bootstrapping rqmd in a new or existing repo. Registered in `package.json` `chatPromptFiles`. Replaces the missing `/init` that was shadowed by a VS Code built-in and never wired as a prompt file.

### Changed

- Split `bundle.md` (76-req monolith) into 9 focused domain files: `init.md`, `bundle-lifecycle.md`, `shaping.md`, `prompts.md`, `feedback.md`, `agent-execution.md`, `sessions.md`, `tech-debt.md`, `docs-ux.md`. No requirement IDs changed.
- Fixed corrupted status emoji on RQMD-EXT-087.

<a id="v0-2-9"></a>

## [0.2.9] - 2026-04-17

### Added

- `/rqmd-staleness` skill: wraps `rqmd --staleness --json` to categorize findings into deprecated-but-alive, unreferenced, and high-staleness buckets with cleanup recommendations.
- `/tech-debt` prompt: user-facing entry point for staleness analysis with support for `deprecated-only`, domain filter, threshold, and `explain` arguments.

### Changed

- Release skill: rewrote preflight as ordered steps; CHANGELOG stamping is now an explicit Step 1 with a hard-fail warning before tagging.
- Agent file: promoted requirement ID linking rule to mandatory blockquote at top of file.
- All prompt descriptions now include `rqmd (v0.2.9)` version annotations.

<a id="v0-2-8"></a>

## [0.2.8] - 2026-04-16

### Added

- `scripts/bump-prompt-versions.sh`: stamps `rqmd (vX.Y.Z)` in every prompt description from `package.json` or an explicit argument.

### Changed

- All prompt descriptions now include `rqmd (v0.2.8)` version annotations for disambiguation when multiple rqmd extensions are installed.

<a id="v0-2-7"></a>

## [0.2.7] - 2026-04-15

### Added

- `docs/requirements/bundle.md`: 💡 Proposed RQMD-EXT-079 (`/tech-debt-sweep`), RQMD-EXT-080 (`/archive` file-level), RQMD-EXT-081 (`/retro` tech-debt drift), RQMD-EXT-082 (`/archive` per-requirement), RQMD-EXT-083 (`/refine` drafts into tracker early).

### Changed

- `prompts/refine.prompt.md` ([RQMD-EXT-083](docs/requirements/bundle.md#rqmd-ext-083)): Pass 1 now writes the requirement to the tracker file immediately as 💡 Proposed; Pass 2+ edits in-place in the file; chat references the file link, not a duplicated spec; interrupted sessions survive because the requirement is already persisted.
- `prompts/retro.prompt.md` ([RQMD-EXT-081](docs/requirements/bundle.md#rqmd-ext-081)): added 5th drift category "Tech debt accrual" — surfaces dead code, workarounds, and deprecated-but-wired modules; tags findings `[tech-debt]` in `docs/inbox.md` for `/tech-debt-sweep` pickup; includes debt count in retro summary.
- `prompts/brainstorm.prompt.md`, `skills/rqmd-brainstorm/SKILL.md` ([RQMD-EXT-046](docs/requirements/bundle.md#rqmd-ext-046), [RQMD-EXT-047](docs/requirements/bundle.md#rqmd-ext-047), [RQMD-EXT-048](docs/requirements/bundle.md#rqmd-ext-048)): brainstorm now auto-drafts solidified ideas as 💡 Proposed entries without asking permission; actively resists writing code/tests and redirects to `/go`; detects bug signals and offers `/bug` template.
- `prompts/refine.prompt.md` ([RQMD-EXT-046](docs/requirements/bundle.md#rqmd-ext-046), [RQMD-EXT-047](docs/requirements/bundle.md#rqmd-ext-047), [RQMD-EXT-048](docs/requirements/bundle.md#rqmd-ext-048)): refine now auto-drafts new requirements during shaping; resists implementation; detects bug patterns and offers to switch to bug template.

### Added

- `docs/glossary.md` ([RQMD-EXT-076](docs/requirements/bundle.md#rqmd-ext-076)): canonical glossary of rqmd domain terms with one-line definitions and capitalisation rules.
- `prompts/retro.prompt.md` ([RQMD-EXT-071](docs/requirements/bundle.md#rqmd-ext-071)): `/retro` structured post-work retrospective — gathers git diff, requirement statuses, and session tree; classifies drift into four categories (untracked changes, skipped refinement, scope expansion, stalled work); writes a `retro` node to the session file; reports Inbox count.
- `prompts/catchup.prompt.md` ([RQMD-EXT-072](docs/requirements/bundle.md#rqmd-ext-072)): `/catchup` re-orientation prompt — reads previous session file, `git status`, and backlog summary; presents last session retro, in-progress items, uncommitted changes, and top 3 next actions; writes a `catchup` session node; reports Inbox count.

### Changed

- `prompts/brainstorm.prompt.md`, `skills/rqmd-brainstorm/SKILL.md` ([RQMD-EXT-077](docs/requirements/bundle.md#rqmd-ext-077)): `/brainstorm` now detects short input (single sentence, "quick note:", "inbox:") and appends to `docs/inbox.md` instead of running a full exploration; responds with single-line `📥 Added to inbox (N items pending triage)` confirmation.
- `skills/rqmd-triage/SKILL.md` ([RQMD-EXT-077](docs/requirements/bundle.md#rqmd-ext-077)): triage gains inbox-first mode — checks `docs/inbox.md` before backlog triage and offers to sweep items.
- `agents/rqmd.agent.md` ([RQMD-EXT-076](docs/requirements/bundle.md#rqmd-ext-076)): agent instructions now reference `docs/glossary.md` domain term convention for consistent capitalisation in chat output.
- `docs/doc-standards.md` (rqmd-cli) ([RQMD-EXT-076](docs/requirements/bundle.md#rqmd-ext-076)): added "Introduce Domain Terms Consistently" section alongside existing acronym/jargon rule.

<a id="v0-2-6"></a>

## [0.2.6] - 2026-04-14

### Added

- `extension.js` ([RQMD-EXT-066](docs/requirements/bundle.md#rqmd-ext-066)): DocumentLinkProvider makes every known requirement ID clickable in any open file. Clicking `RQMD-EXT-063` opens the requirement in markdown preview scrolled to its stable `<a id>` anchor; falls back to the editor at the heading line if preview is unavailable. The ID→file index is built by scanning `docs/requirements/*.md` in all workspace folders and refreshed via a file watcher.
- `package.json` ([RQMD-EXT-066](docs/requirements/bundle.md#rqmd-ext-066)): registered `rqmd.openRequirement` internal command (DocumentLink click handler; `enablement: false` hides it from the command palette).
- `docs/requirements/bundle.md`, `docs/requirements/extension.md` ([RQMD-EXT-068](docs/requirements/bundle.md#rqmd-ext-068)): backfilled stable `<a id="rqmd-xxx-nnn"></a>` anchors before all 70 requirement headings (60 in bundle.md, 10 in extension.md). Anchors survive title renames and resolve correctly in VS Code markdown preview, GitHub rendered markdown, and the DocumentLinkProvider.

### Changed

- `prompts/refine.prompt.md` ([RQMD-EXT-063](docs/requirements/bundle.md#rqmd-ext-063)): `/refine` is now an iterative shaping loop — Pass 1 pre-fills acceptance criteria from brainstorm notes, adjacent requirements, and codebase context; Pass 2+ tightens through conversation; agent actively invites first-person narratives ("Walk me through what happens to you right now…"); agent declares "shaped" and offers `/go` when no open questions remain. Shaping confirmation includes a clickable link to the requirement. Features use Given/When/Then; bugs use Steps/Expected/Actual/Root Cause. Subsequent `/refine` calls continue tightening rather than restarting.
- `prompts/go.prompt.md` ([RQMD-EXT-061](docs/requirements/bundle.md#rqmd-ext-061)): `/go` shaping check now reads the requirement body and checks for acceptance criteria (Given/When/Then, Steps/Expected/Actual, `## Done when`). Unshaped requirements get one nudge — "This hasn't been shaped yet — want me to `/refine` it first, or proceed anyway?" — with an offer to start an interactive shaping loop; proceeds immediately on explicit confirmation. Requirements with acceptance criteria skip the nudge entirely.

- `agents/rqmd.agent.md`, `prompts/go.prompt.md`, `prompts/refine.prompt.md` ([RQMD-EXT-067](docs/requirements/bundle.md#rqmd-ext-067)): agent now always emits requirement IDs as markdown links (`[RQMD-EXT-063](docs/requirements/bundle.md#rqmd-ext-063)`); bare ID only when the source file is unknown.
- `skills/rqmd-implement/SKILL.md`, `skills/rqmd-brainstorm/SKILL.md` ([RQMD-EXT-068](docs/requirements/bundle.md#rqmd-ext-068)): added anchor convention — always write `<a id="rqmd-xxx-nnn"></a>` on its own line immediately before new `### RQMD-XXX-NNN:` headings.

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
