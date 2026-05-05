# Requirements Index

This directory tracks requirements for the `rqmd` VS Code extension. The extension provides the AI bundle and IDE integration surface for rqmd-managed workspaces.


## Project Tooling Metadata

This section records the rqmd tooling versions currently expected by this repository.
Refresh it after upgrading rqmd by running `rqmd --sync-index-metadata --force-yes`.

<!-- rqmd-project-metadata:start -->
- `rqmd_version`: `0.2.11`
- `json_schema_version`: `1.1.0`
<!-- rqmd-project-metadata:end -->


## Files

| File | Scope | IDs |
|------|-------|-----|
| [init.md](init.md) | Bundle bootstrap, legacy-init, interview flows, and onboarding guidance | RQMD-INIT-001–016 |
| [bundle-lifecycle.md](bundle-lifecycle.md) | Bundle install, upgrade, versioning, provenance metadata, and release workflow | RQMD-BUNDLE-001–009 |
| [shaping.md](shaping.md) | Requirement authoring, brainstorm workflows, `/refine` shaping loops, and inbox quick-capture | RQMD-SHAPE-001–012 |
| [prompts.md](prompts.md) | Installed prompt entrypoints (`/go`, `/bug`, `/commit-and-go`), agent naming, and deprecated agent variants | RQMD-PROMPT-001–007 |
| [feedback.md](feedback.md) | User-driven rqmd product feedback, telemetry skills, and GitHub issue creation | RQMD-AI-FEEDBACK-001–006 |
| [agent-execution.md](agent-execution.md) | Agent workflow entry points, preflight readiness checks, `/dev` and `/test` skill delegation | RQMD-AI-EXEC-001–009 |
| [sessions.md](sessions.md) | Session tree structure, `/retro` retrospectives, `/catchup` orientation, and session-aware coaching | RQMD-SESSION-001–008 |
| [tech-debt.md](tech-debt.md) | Tech-debt sweep, staleness surface, `/archive` for deprecated requirements | RQMD-TECHDEBT-001–004 |
| [docs-ux.md](docs-ux.md) | Documentation quality skills, clickable requirement links, stable anchors, domain term conventions | RQMD-DOCS-001–011 |
| [extension.md](extension.md) | VS Code extension infrastructure: distribution, chat participant, command palette, self-healing bootstrap | RQMD-VSCODE-001–011 |

## ID scheme

Requirements use domain-specific prefixes for clarity and to reduce collisions when collaborating across projects.
The original `RQMD-EXT-*` catchall is being migrated to named domains file-by-file:

| Prefix | Domain | File |
|---|---|---|
| `RQMD-AI-FEEDBACK-*` | User feedback, telemetry skills, GitHub issue creation | `feedback.md` |
| `RQMD-AI-EXEC-*` | Agent execution, preflight, dev/test skill delegation | `agent-execution.md` |
| `RQMD-BUNDLE-*` | Bundle install, upgrade, versioning, provenance | `bundle-lifecycle.md` |
| `RQMD-DOCS-*` | Documentation quality, clickable links, anchors, domain terms | `docs-ux.md` |
| `RQMD-INIT-*` | Bootstrap, legacy-init, interview flows, onboarding | `init.md` |
| `RQMD-PROMPT-*` | Prompt entrypoints `/go`, `/bug`, `/commit-and-go` | `prompts.md` |
| `RQMD-SESSION-*` | Session tree, retro, catchup, session-aware coaching | `sessions.md` |
| `RQMD-SHAPE-*` | Requirement authoring, brainstorm, refine shaping loops | `shaping.md` |
| `RQMD-TECHDEBT-*` | Tech-debt sweep, staleness, archive workflows | `tech-debt.md` |
| `RQMD-VSCODE-*` | VS Code extension infra: marketplace, chat participant, bootstrap | `extension.md` |
| `RQMD-BUG-*` | Active bugs | `bugs.md` |

## Status key

| Symbol | Meaning |
|--------|---------|
| 💡 Proposed | Scoped and ready for implementation |
| 🔧 Implemented | Code shipped, not yet formally verified |
| ✅ Verified | Acceptance criteria confirmed |
| ⚠️ Needs attention | Partial or degraded |
| ⛔ Blocked | Hard dependency not yet met |
| 🗑️ Deprecated | No longer relevant, kept for history |
