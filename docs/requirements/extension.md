# Extension Infrastructure Requirements

Scope: VS Code extension packaging and distribution — Marketplace publication, command palette integration, chat participant registration, prompt/skill surface contributions, and self-healing rqmd bootstrap.

<!-- acceptance-status-summary:start -->
Summary: 4💡 6🔧 1✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-051"></a>

### RQMD-EXT-051: Distribute rqmd AI bundle as a VS Code extension

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The rqmd agent bundle (prompts, skills, agent definitions, copilot-instructions) distributed as a VS Code extension named "rqmd" on the Marketplace instead of files written into each project's `.github/` folder so that upgrading rqmd's AI bundle is a VS Code extension update — no git diff, no PR churn, no maintaining generated files I didn't write.
- Given a user who has the rqmd VS Code extension installed
- When they open any workspace
- Then Copilot discovers the extension-contributed prompts, skills, and agent definitions without any files in `.github/`.
- And `rqmd-ai install` is no longer needed — the extension replaces the file-based bundle entirely.

<a id="rqmd-ext-052"></a>

### RQMD-EXT-052: VS Code extension project scaffolding via command palette

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Blocked by:** RQMD-EXT-051
- **Summary:** The VS Code extension to provide a command palette action (e.g., "rqmd: Initialize Project") that runs the interview flow and scaffolds project-specific files (`/dev`, `/test` skills, starter requirement docs) so that project setup is an IDE-native experience rather than a CLI command that writes files I then have to understand.
- Given a user who opens the command palette and runs "rqmd: Initialize Project"
- When the interview flow completes
- Then only project-specific files are written to `.github/` (e.g., `/dev` and `/test` skills, project copilot-instructions overrides).
- And shared rqmd defaults (prompts, skills, agent defs) remain in the extension, not written to the workspace.

<a id="rqmd-ext-053"></a>

### RQMD-EXT-053: Register @rqmd chat participant for unified command surface

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Blocked by:** RQMD-EXT-051
- **Summary:** To type `@rqmd brainstorm`, `@rqmd go`, `@rqmd next` instead of picking between `/brainstorm` and `/rqmd-brainstorm` so that all rqmd commands live under one `@rqmd` namespace with clear extension attribution.
- Given a user who types `@rqmd ` in Copilot Chat
- When autocomplete appears
- Then subcommands like `brainstorm`, `go`, `next`, `commit`, `refine` are shown.
- And invoking `@rqmd brainstorm` loads the `/rqmd-brainstorm` skill internally and runs the workflow.

<a id="rqmd-ext-054"></a>

### RQMD-EXT-054: Migrate /prompts to @rqmd subcommands

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Blocked by:** RQMD-EXT-053
- As the rqmd maintainer after the @rqmd chat participant ships
- **Summary:** To deprecate or remove the separate `/brainstorm`, `/go`, `/next` prompts from chatPromptFiles contribution so that users have one entry point (`@rqmd <command>`) instead of choosing between `/brainstorm` and `@rqmd brainstorm`.
- Given a user who types `/` in Copilot Chat after migration
- When autocomplete appears
- Then no rqmd prompts appear (only `@rqmd` in the `@` namespace).

<a id="rqmd-ext-055"></a>

### RQMD-EXT-055: Skills hidden from user autocomplete via user-invocable flag

- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** To see only the 12 clean rqmd prompts, not the 17 internal skills so that autocomplete is not cluttered with duplicate `/brainstorm` + `/rqmd-brainstorm` entries.
- Given all skill SKILL.md files have `user-invocable: false` in frontmatter
- When a user types `/rqmd-` in Copilot Chat
- Then no skill completions appear.
- And agents can still reference `/rqmd-brainstorm` internally and load the skill.

<a id="rqmd-ext-056"></a>

### RQMD-EXT-056: Same-major rqmd auto-install version policy

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- As the rqmd extension
- When installing or updating the rqmd CLI tool automatically
- **Summary:** To install the newest version within the currently-installed major line so that minor and patch upgrades are applied automatically without user action.
- Given no prior rqmd install exists
- When bootstrap installs rqmd for the first time
- Then the installed major is persisted to VS Code workspace/global state.
- And subsequent auto-upgrades stay within that major.

<a id="rqmd-ext-057"></a>

### RQMD-EXT-057: Missing-rqmd bootstrap notification flow

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Blocked by:** RQMD-EXT-056
- **Summary:** The extension to show a VS Code notification and immediately bootstrap rqmd (and uv if needed) without requiring me to approve each individual install command so that the painful flow of approving many commands just to run rqmd is eliminated.
- Given rqmd is not installed when an rqmd command is first invoked
- When the bootstrap begins
- Then the notification reads: "Installing rqmd (and uv if it is not available) so this workspace can run rqmd commands."
- And on success: "rqmd is ready. Re-running your command now."
- And on failure: "Could not install rqmd automatically. Check network, permissions, or Python toolchain and try again."

<a id="rqmd-ext-058"></a>

### RQMD-EXT-058: Unified shim bootstrap entrypoint for all rqmd invocations

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Blocked by:** RQMD-EXT-057
- **Summary:** Every rqmd invocation to route through a single shared bootstrap shim so that missing-tool recovery happens consistently regardless of how rqmd is triggered.
- Given an agent or user invokes rqmd from any call site
- When the shim handles the invocation
- Then only the shim contains install logic — no individual call site does.

<a id="rqmd-ext-059"></a>

### RQMD-EXT-059: Bootstrap install lock and session debounce

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Blocked by:** RQMD-EXT-058
- As the rqmd extension when multiple rqmd commands are queued simultaneously
- **Summary:** A concurrency lock on the bootstrap install process so that only one install attempt runs at a time and subsequent calls wait for it to complete rather than spawning duplicate installs.
- Given two rqmd commands fire concurrently while rqmd is not yet installed
- When the first triggers bootstrap
- Then the second waits rather than launching a parallel install.
- And both complete after the single install finishes.

<a id="rqmd-ext-060"></a>

### RQMD-EXT-060: Bootstrap reason-code telemetry and diagnostics

- **Status:** 🔧 Implemented
- **Priority:** 🟢 P3 - Low
- **Blocked by:** RQMD-EXT-058
- As the rqmd maintainer diagnosing workstation setup failures
- **Summary:** The bootstrap shim to emit a structured reason code for every invocation path so that telemetry captures how often users need auto-install versus already having rqmd present.
- Reason codes: `already-present` | `installed-rqmd` | `installed-uv-and-rqmd` | `install-failed` | `major-mismatch`
- Major-mismatch user message: "Installed rqmd major X, but this workflow expects major Y. Please update manually."
- Given bootstrap completes with any outcome
- When a reason code is emitted
- Then it is sent to the telemetry service and written to the extension debug log.

<a id="rqmd-ext-088"></a>

### RQMD-EXT-088: Extension icon for marketplace and chat mode picker

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** Add a custom icon to `package.json` (`"icon": "assets/rqmd-icon.png"`, 128×128 PNG) so that rqmd is visually distinct in the VS Code Marketplace listing, extension sidebar, and — critically — the chat mode picker where it currently appears as a generic entry alongside "Agent", "Ask", and "Plan" which all have branded icons.
- Given the rqmd extension is installed
- When the user opens the chat mode picker dropdown
- Then rqmd appears with a distinctive, recognizable icon rather than the generic default.
- And the same icon is used in the Marketplace listing and extension sidebar.
- **Notes:**
  - AI-generated initial draft is acceptable, but the icon must be human-reviewed and refined before shipping to the Marketplace.
  - Track whether VS Code's `chatAgents` contribution point gains a per-agent `icon` property in future API — currently only the top-level extension `icon` is supported.
  - Design direction: keep it simple and legible at 16×16 (sidebar) through 128×128 (Marketplace). Consider the "📋" requirement-doc motif or a stylized `rq` mark.
