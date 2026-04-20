# Documentation and UX Requirements

Scope: Documentation quality skills, clickable requirement links, stable anchors, domain term conventions, and VS Code UX commands.

<!-- acceptance-status-summary:start -->
Summary: 1💡 8🔧 1✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-024"></a>

### RQMD-EXT-024: Default markdown closeout styling for installed AI guidance

- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** The installed default agent instructions to prefer a concise markdown closeout structure such as `# What got done`, `# Up next`, and `# Direction` so that implementation updates are easier to scan quickly in AI chat transcripts and review handoffs.

<a id="rqmd-ext-028"></a>

### RQMD-EXT-028: Authored changelog maintenance skill

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-changelog` skill for maintaining `CHANGELOG.md` so that changelog work becomes a first-class authored workflow instead of an implicit side effect of generic docs cleanup.

<a id="rqmd-ext-029"></a>

### RQMD-EXT-029: General documentation-quality skill

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a dedicated `/rqmd-docs` skill for documentation quality and structure work beyond simple drift correction so that README, requirement docs, bundle guidance, and other markdown can be improved using explicit standards for headings, clarity, jargon handling, page splitting, hyperlinks, and callouts instead of only being kept mechanically in sync.

<a id="rqmd-ext-030"></a>

### RQMD-EXT-030: Consistent cross-project AI workflow experience

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Shipped rqmd agents and skills to behave consistently across projects even when the requirement catalogs and priorities differ so that users build trust and familiarity with the AI workflows instead of relearning a different style in every repository.

<a id="rqmd-ext-031"></a>

### RQMD-EXT-031: Pinned context and decision notes workflow

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An `rqmd-pin` workflow for capturing important context, decisions, and quick-reference notes that should remain easy to find later so that useful insights do not disappear into chat history or scattered documentation during brainstorming and implementation.

<a id="rqmd-ext-066"></a>

### RQMD-EXT-066: DocumentLinkProvider makes requirement IDs clickable in the editor

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer reading any file in VS Code (brainstorm.md, CHANGELOG.md, agent.md, skill files, code comments), I want every requirement ID to be a one-click link that opens the requirement in **markdown preview** scrolled to the right heading, so that navigating from any mention to the rendered spec replaces the current 5-step Ctrl+Shift+F workflow.
- Given a file is open in the VS Code editor and contains text matching a known requirement ID (e.g. `RQMD-EXT-063`)
- When the rqmd extension activates its DocumentLinkProvider
- Then every matching ID is rendered as a clickable link (underlined, Cmd/Ctrl-click)
- And clicking the link opens the requirement's source file in **markdown preview** and scrolls to the stable `<a id="rqmd-ext-063"></a>` anchor (see RQMD-EXT-068)
- And the ID→file mapping is built from `rqmd --json --non-interactive` output (which includes `source_file` per requirement), cached at workspace open, and refreshed via a file watcher on `docs/requirements/`
- And only IDs present in the `rqmd --json` index are linked — unknown IDs (typos, future IDs not yet indexed) produce no link, not a dead link
- And the feature works in editor, diff view, and search results
- And if markdown preview cannot resolve the anchor, the link falls back to opening the file in the editor at the heading line

<a id="rqmd-ext-067"></a>

### RQMD-EXT-067: Agent always emits requirement IDs as clickable markdown links

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer reading agent output in VS Code chat, I want **every** requirement ID the agent mentions to be a clickable link to the requirement source, so that I can jump to the spec with one click from any agent response — shaping confirmations, `/go` handoffs, `/retro` summaries, triage lists, everything.
- **VS Code chat constraint:** VS Code chat renders file links as button widgets, NOT blue hyperlinks. HTML anchor fragments (`#rqmd-ext-063`) produce NO link at all — only `#L<number>` line references work. The agent must look up the heading line number and use that.
- **Format — Option F (inline):** `RQMD-EXT-067 [spec](docs/requirements/bundle.md#L472)` — bare ID followed by a `[spec]` link with `#L<line>` fragment
- **Format — tables:** merge ID and link in one column: `RQMD-EXT-067 [spec](file.md#L<n>) | Title | Pri`
- Given the agent references a requirement ID anywhere in chat output
- When the agent knows the source file and line number for that ID (from reading the file or from `rqmd --json`)
- Then it emits: `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` — the ID as plain text, then a `[spec]` link with a `#L<line>` fragment pointing to the heading line
- And in tables, the ID and `[spec]` link share the Req column: `RQMD-EXT-063 [spec](file.md#L<n>)`
- And the agent determines the line number by reading the file (the `<a id>` tag or `###` heading line)
- And when the agent does not know the source file or line number, it emits the bare ID as fallback (graceful degradation)
- And the `<a id>` anchor tags (RQMD-EXT-068) are kept for GitHub, VS Code markdown preview, and DocumentLinkProvider — they serve all link surfaces except chat
- And the convention is encoded in the `rqmd.agent.md` instructions and the `/refine`, `/go`, and `/retro` skill files so all agent modes follow it

<a id="rqmd-ext-068"></a>

### RQMD-EXT-068: Stable anchor IDs on requirement headings

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer or agent linking to a specific requirement, I want each requirement heading to have a stable `<a id="rqmd-ext-nnn"></a>` anchor that survives title edits, so that cross-references from chat, brainstorm.md, CHANGELOG, and other files never break when a requirement's title is reworded.
- **Anchor authorship:** Dual approach — **(a)** agent convention writes anchors when creating/updating requirements, **(b)** `rqmd --verify-summaries` (or future `--fix-anchors`) heals any that were missed. Agent convention ships first; CLI healing can be deferred.
- Given a requirement heading like `### RQMD-EXT-063: /refine is an interactive shaping loop`

- When the requirement is created or updated (by agent or human)
- Then an anchor tag `<a id="rqmd-ext-063"></a>` is present immediately before the heading
- And the anchor ID is the lowercase, hyphenated requirement ID (not derived from the title text)
- And links using `bundle.md#rqmd-ext-063` resolve correctly in VS Code markdown preview, GitHub rendered markdown, and the DocumentLinkProvider (RQMD-EXT-066)
- And existing requirements (~68 today) are backfilled with anchors in a one-time batch before this feature ships
- And the agent skill instructions (`rqmd-implement`, `rqmd-brainstorm`, `/refine`) include the convention: "always write `<a id>` before new requirement headings"

<a id="rqmd-ext-076"></a>

### RQMD-EXT-076: Domain Term Introduction Convention

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer reading rqmd docs, requirement text, or agent chat output, I want domain-specific terms ("Done-When", "Session Tree", "User Story", "Smoke Path", etc.) introduced and capitalised consistently, so that I can recognise terms of art at a glance and distinguish them from plain English.
- Given a new rqmd domain term appears for the first time on a page or in a conversation
- When the author (human or agent) writes it
- Then the term is double-quoted and Title Cased on first use: "Done-When", "Session Tree", "User Story"
- And subsequent uses on the same page/conversation drop the quotes but keep Title Case: Done-When, Session Tree, User Story
- And multi-word terms without a hyphen stay spaced Title Case: User Story, Smoke Path, Session Tree
- And compound-modifier terms stay hyphenated as a unit: Done-When, Session-Start
- And headings use Title Case without quotes: `#### Done-When Criteria`

- And CLI / JSON keys remain snake_case: `done_when`, `session_tree`
- And a canonical glossary file at `docs/glossary.md` lists every rqmd domain term with a one-line definition and its canonical capitalisation
- And the convention is codified in `docs/doc-standards.md` alongside the existing acronym/jargon rule
- And the `rqmd` agent instructions reference the convention so agents follow it in chat output

<a id="rqmd-ext-078"></a>

### RQMD-EXT-078: `rqmd: Quick Capture` VS Code command

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer who wants the absolute lowest-friction idea capture, I want a VS Code command palette entry (and keybinding target) that pops an input box and appends my text to `docs/inbox.md`, so that I never leave my current file or open the chat panel just to jot down an idea.
- Given the rqmd extension is installed and a workspace has a `docs/` directory
- When the developer triggers `rqmd: Quick Capture` from the command palette (or a keybinding)
- Then VS Code shows a single-line input box with placeholder text: "Quick idea — appends to docs/inbox.md"
- And on submit, the extension appends a `- <text>` line to `docs/inbox.md` (creating the file with `# Inbox\n\n` header if it doesn't exist)

- And a brief VS Code information message confirms: "📥 Added to inbox"
- And pressing Escape cancels without writing

