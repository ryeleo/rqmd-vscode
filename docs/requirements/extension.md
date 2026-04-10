# Extension Infrastructure Requirements

Scope: VS Code extension packaging and distribution — Marketplace publication, command palette integration, chat participant registration, and prompt/skill surface contributions.

<!-- acceptance-status-summary:start -->
Summary: 2💡 2🔧 1✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

### RQMD-EXT-051: Distribute rqmd AI bundle as a VS Code extension
- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- As an rqmd user who uses AI agents across multiple projects
- I want the rqmd agent bundle (prompts, skills, agent definitions, copilot-instructions) distributed as a VS Code extension named "rqmd" on the Marketplace instead of files written into each project's `.github/` folder
- So that upgrading rqmd's AI bundle is a VS Code extension update — no git diff, no PR churn, no maintaining generated files I didn't write.
- So that reproducibility is handled by pinning the extension version, not by git-tracking generated config files.
- So that rqmd behaves like other project-agnostic developer tools (linters, formatters) that ship as extensions rather than committed repo config.
- So that the Python package (`rqmd` on PyPI) stays focused on what it does well — CLI for managing the requirements/ folder — while the VS Code extension owns the entire AI/IDE integration surface.
- So that per-project overrides (e.g., `/dev` and `/test` skill scaffolds, project-specific copilot-instructions) can optionally live in `.github/` as workspace-level customizations while the shared rqmd defaults come from the extension.
- Given a user who has the rqmd VS Code extension installed
- When they open any workspace
- Then Copilot discovers the extension-contributed prompts, skills, and agent definitions without any files in `.github/`.
- And `rqmd-ai install` is no longer needed — the extension replaces the file-based bundle entirely.

### RQMD-EXT-052: VS Code extension project scaffolding via command palette
- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Blocked by:** RQMD-EXT-051
- As a developer setting up rqmd in a new project
- I want the VS Code extension to provide a command palette action (e.g., "rqmd: Initialize Project") that runs the interview flow and scaffolds project-specific files (`/dev`, `/test` skills, starter requirement docs)
- So that project setup is an IDE-native experience rather than a CLI command that writes files I then have to understand.
- So that the extension can detect the repository's build/test/run commands and generate project-specific skill scaffolds just like `rqmd-ai install --chat` does today, but as a VS Code command.
- Given a user who opens the command palette and runs "rqmd: Initialize Project"
- When the interview flow completes
- Then only project-specific files are written to `.github/` (e.g., `/dev` and `/test` skills, project copilot-instructions overrides).
- And shared rqmd defaults (prompts, skills, agent defs) remain in the extension, not written to the workspace.

### RQMD-EXT-053: Register @rqmd chat participant for unified command surface
- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Blocked by:** RQMD-EXT-051
- As a user invoking rqmd workflows in Copilot Chat
- I want to type `@rqmd brainstorm`, `@rqmd go`, `@rqmd next` instead of picking between `/brainstorm` and `/rqmd-brainstorm`
- So that all rqmd commands live under one `@rqmd` namespace with clear extension attribution.
- So that users see `@rqmd` in autocomplete like they see `@terminal` or `@mermaid-chart` from other extensions.
- So that skills remain agent-internal (loaded by handler code) and never clutter user autocomplete.
- Given a user who types `@rqmd ` in Copilot Chat
- When autocomplete appears
- Then subcommands like `brainstorm`, `go`, `next`, `commit`, `refine` are shown.
- And invoking `@rqmd brainstorm` loads the `/rqmd-brainstorm` skill internally and runs the workflow.

### RQMD-EXT-054: Migrate /prompts to @rqmd subcommands
- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Blocked by:** RQMD-EXT-053
- As the rqmd maintainer after the @rqmd chat participant ships
- I want to deprecate or remove the separate `/brainstorm`, `/go`, `/next` prompts from chatPromptFiles contribution
- So that users have one entry point (`@rqmd <command>`) instead of choosing between `/brainstorm` and `@rqmd brainstorm`.
- So that the extension surface is clean: one chat participant, zero user-visible prompts, zero user-visible skills.
- Given a user who types `/` in Copilot Chat after migration
- When autocomplete appears
- Then no rqmd prompts appear (only `@rqmd` in the `@` namespace).

### RQMD-EXT-055: Skills hidden from user autocomplete via user-invocable flag
- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- As a user typing `/` in Copilot Chat
- I want to see only the 12 clean rqmd prompts, not the 17 internal skills
- So that autocomplete is not cluttered with duplicate `/brainstorm` + `/rqmd-brainstorm` entries.
- So that skills remain loadable by agents internally while hidden from direct user invocation.
- Given all skill SKILL.md files have `user-invocable: false` in frontmatter
- When a user types `/rqmd-` in Copilot Chat
- Then no skill completions appear.
- And agents can still reference `/rqmd-brainstorm` internally and load the skill.
