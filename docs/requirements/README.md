# Requirements Index

This directory tracks requirements for the `rqmd` VS Code extension. The extension provides the AI bundle and IDE integration surface for rqmd-managed workspaces.


## Project Tooling Metadata

This section records the rqmd tooling versions currently expected by this repository.
Refresh it after upgrading rqmd by running `rqmd --sync-index-metadata --force-yes`.

<!-- rqmd-project-metadata:start -->
- `rqmd_version`: `0.2.4`
- `json_schema_version`: `1.1.0`
<!-- rqmd-project-metadata:end -->


## Files

| File | Scope | IDs |
|------|-------|-----|
| [init.md](init.md) | Bundle bootstrap, legacy-init, interview flows, and onboarding guidance | RQMD-EXT-009–022, 027, 069–070 |
| [bundle-lifecycle.md](bundle-lifecycle.md) | Bundle install, upgrade, versioning, provenance metadata, and release workflow | RQMD-EXT-001, 005–007, 035–036, 084–086 |
| [shaping.md](shaping.md) | Requirement authoring, brainstorm workflows, `/refine` shaping loops, and inbox quick-capture | RQMD-EXT-002–004, 023, 046–048, 061–063, 077, 083 |
| [prompts.md](prompts.md) | Installed prompt entrypoints (`/go`, `/bug`, `/commit-and-go`), agent naming, and deprecated agent variants | RQMD-EXT-025–026, 032–034, 045, 049 |
| [feedback.md](feedback.md) | User-driven rqmd product feedback, telemetry skills, and GitHub issue creation | RQMD-EXT-042–044, 050 |
| [agent-execution.md](agent-execution.md) | Agent workflow entry points, preflight readiness checks, `/dev` and `/test` skill delegation | RQMD-EXT-008, 010, 037–041 |
| [sessions.md](sessions.md) | Session tree structure, `/retro` retrospectives, `/catchup` orientation, and session-aware coaching | RQMD-EXT-064–065, 071–075, 081 |
| [tech-debt.md](tech-debt.md) | Tech-debt sweep, staleness surface, `/archive` for deprecated requirements | RQMD-EXT-079–080, 082, 087 |
| [docs-ux.md](docs-ux.md) | Documentation quality skills, clickable requirement links, stable anchors, domain term conventions | RQMD-EXT-024, 028–031, 066–068, 076, 078 |
| [extension.md](extension.md) | VS Code extension infrastructure: distribution, chat participant, command palette, self-healing bootstrap | RQMD-EXT-051–060, 088 |

## ID scheme

All requirements in this repository use the `RQMD-EXT-*` prefix.

## Status key

| Symbol | Meaning |
|--------|---------|
| 💡 Proposed | Scoped and ready for implementation |
| 🔧 Implemented | Code shipped, not yet formally verified |
| ✅ Verified | Acceptance criteria confirmed |
| ⚠️ Needs attention | Partial or degraded |
| ⛔ Blocked | Hard dependency not yet met |
| 🗑️ Deprecated | No longer relevant, kept for history |
