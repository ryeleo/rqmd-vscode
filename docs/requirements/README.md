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
| [bundle.md](bundle.md) | Installed AI bundle content: agents, skills, prompts, and workflow guidance | RQMD-EXT-001–050 |
| [extension.md](extension.md) | VS Code extension infrastructure: distribution, chat participant, command palette, self-healing bootstrap | RQMD-EXT-051–060 |

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
