# Shaping and Refinement Requirements

Scope: Requirement authoring, brainstorm workflows, `/refine` shaping loops, and inbox quick-capture.

<!-- acceptance-status-summary:start -->
Summary: 1💡 10🔧 1✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-002"></a>

### RQMD-EXT-002: Requirement-first AI workflow guidance

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and docs to prescribe a requirement-first workflow before code is applied so that brainstorm ideas are promoted into tracked requirements, index updates, and changelog entries before implementation starts.

<a id="rqmd-ext-003"></a>

### RQMD-EXT-003: Brainstorm-to-requirements planning mode

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai to support a dedicated brainstorm workflow that turns raw notes into ranked requirement proposals so that loose brainstorming can be promoted into concrete requirement entries before implementation begins.

<a id="rqmd-ext-004"></a>

### RQMD-EXT-004: Proposal-batch implementation mode

- **Status:** 🔧 Implemented
- **Priority:** 🔴 P0 - Critical
- **Summary:** Rqmd-ai guidance to define an explicit implement mode that works the highest-priority proposed requirements in small validated batches so that the agent updates requirements, tests, and changelog entries as details become concrete rather than deferring documentation until the end.

<a id="rqmd-ext-023"></a>

### RQMD-EXT-023: Encourage dual user-story and Given/When/Then requirement authoring

- **Status:** ✅ Verified
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd-ai guidance and editing workflows to actively encourage requirements that include both a user story and a Given/When/Then acceptance block when both are useful so that generated or edited requirements are easier to understand at both the product-intent and implementation-detail levels.

<a id="rqmd-ext-046"></a>

### RQMD-EXT-046: Auto-draft requirements during brainstorm and refine sessions

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The agent to automatically write solidified ideas into `docs/requirements/` as 💡 Proposed entries rather than asking me for permission each time so that when any session picks up the `/go` handoff prompt, the requirements it references already exist in the tracked docs and the implementation session has a clear contract to work from.

<a id="rqmd-ext-047"></a>

### RQMD-EXT-047: Brainstorm and refine modes resist jumping to implementation

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to actively resist writing code, tests, or implementation changes and instead focus on shaping, clarifying, and tracking requirements so that the brainstorm/refine workflow stays focused on *what* to build and *why*, with implementation deferred to a `/go` handoff in a focused implementation session.

<a id="rqmd-ext-048"></a>

### RQMD-EXT-048: Brainstorm and refine skills detect bug reports and offer bug template

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The agent to recognize that I am describing a bug (keywords like "broken", "regression", "doesn't work", "used to work") and offer the Steps to Reproduce / Expected / Actual / Root Cause template from RQMD-CORE-043 instead of the user-story template so that bugs are drafted with the right shape from the start, with `type: bug` and an `affects:` cross-reference pre-filled when the parent requirement is identifiable.

<a id="rqmd-ext-061"></a>


### RQMD-EXT-061: `/go` nudges shaping before implementing unshaped requirements

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer using `/go` to implement a requirement, I want the agent to detect whether the requirement has been **shaped** (has acceptance criteria from at least one `/refine` pass) and nudge me to shape it first when it hasn't, so that I build the habit of knowing what I'm building — and why — before the agent builds it.
- **Shaping defined:** A requirement is "shaped" when it has acceptance criteria (Given/When/Then for features, Steps/Expected/Actual for bugs) and no unresolved open questions. Shaping is the "is the spec right?" check — distinct from verification ("is the build right?"), which happens after implementation.
- Given the user invokes `/go RQMD-XXX-NNN` on a 💡 Proposed requirement
- When the agent reads the requirement body and finds **no** acceptance criteria (no Given/When/Then, no Steps/Expected/Actual, no `## Done when`)

- Then the agent says: "This requirement hasn't been shaped yet — want me to `/refine` it first, or proceed anyway?" — one question, not a lecture
- And the user can proceed immediately with explicit confirmation (the nudge is friction, not a wall)
- And if the user accepts, the agent starts an interactive `/refine` shaping loop (see RQMD-EXT-063) before continuing to implementation
- And the nudge applies equally to features and bugs — an unshaped bug ("it's broken") gets the same prompt as an unshaped feature
- And requirements that already have acceptance criteria skip the nudge entirely — the agent trusts that shaping happened

<a id="rqmd-ext-062"></a>

### RQMD-EXT-062: Brainstorm items carry promotion status

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer maintaining `docs/brainstorm.md`, I want each idea to carry a visible promotion status so I can see at a glance which ideas are raw, which have been promoted to tracked requirements, and which were intentionally parked, so that raw ideas don't accidentally skip to implementation.
- Given a brainstorm section in `docs/brainstorm.md`
- When the agent or user adds, promotes, or parks an idea
- Then the idea heading or first line includes a status tag: `[raw idea]`, `[→ promoted: RQMD-XXX-NNN]`, or `[parked]`
- And the agent recognizes `[raw idea]` items as needing `/refine` before they can become requirements
- And promotion status is a convention (not enforced tooling) — agents follow it, humans may skip it

<a id="rqmd-ext-063"></a>

### RQMD-EXT-063: `/refine` is an interactive shaping loop, not a one-shot template

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer refining a requirement or bug, I want `/refine RQMD-XXX-NNN` to run an **interactive, iterative shaping loop** — pre-filling from context on the first pass, then tightening through conversation until the spec is clear enough to build — so that shaping feels faster than skipping it and I'm confident in what I'm about to implement.
- **Shaping model:** Each `/refine` pass adds clarity. The agent tracks maturity through the conversation:
  - **Pass 1 — Draft:** Agent reads brainstorm notes, codebase, and adjacent requirements; drafts acceptance criteria (Given/When/Then for features, Steps/Expected/Actual/Root Cause for bugs); presents as "Here's what I think you mean — edit anything that's off."
  - **Pass 2+ — Tighten:** Agent asks about edge cases, conflicts with existing requirements, and open questions. Each round narrows the spec.
  - **Shaped:** Agent confirms: "This looks shaped — acceptance criteria are clear, no open questions. Ready for `/go`?" The developer can accept or keep tightening.
- Given the user invokes `/refine RQMD-XXX-NNN` on any requirement (feature or bug, any status)
- When the agent reads the requirement summary
- Then the agent searches `docs/brainstorm.md` for related context, scans the codebase for files that would be touched, and reads adjacent requirements in the same domain file
- And the agent drafts acceptance criteria appropriate to the requirement type (Given/When/Then for features; Steps/Expected/Actual/Root Cause for bugs)
- And the draft is clearly marked as a proposal ("Here's what I'd suggest") — the developer approves, tweaks, or rejects each criterion
- And the agent asks follow-up questions about edge cases and ambiguities rather than guessing when context is thin
- And during shaping, the agent **actively invites first-person narratives** — "Walk me through what happens to you right now when you try to do X" — because turning-point insights emerge from user stories, not from template-filling
- And subsequent `/refine` calls on the same requirement continue the shaping loop (tighten, not restart)
- And when acceptance criteria are complete and no open questions remain, the agent declares the requirement "shaped" and offers to proceed to `/go`
- And the shaping confirmation includes a clickable link to the requirement (see RQMD-EXT-067) so the developer can review the final spec in one click

<a id="rqmd-ext-077"></a>

### RQMD-EXT-077: Inbox file convention and `/brainstorm` quick-capture mode

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer with a fleeting idea — especially late at night or mid-flow — I want a zero-ceremony way to capture it into a git-tracked "Inbox" so that I can dump ideas without context-switching into organise mode, and triage them later when I'm sharp.
- Given an rqmd-managed project
- When the developer wants to capture an idea quickly
- Then `docs/inbox.md` serves as a flat, append-only capture file with a `# Inbox` heading

- And each item is an unordered list entry (`- idea text here`)
- And multi-line ideas use nested unordered list items for sub-points (not blank-line separation)
- And `/brainstorm` detects short input (single sentence, "quick note:", "inbox:") and appends to `docs/inbox.md` instead of running a full exploration
- And after appending, the agent responds with a single-line confirmation: `> 📥 Added to inbox (N items pending triage)`
- And `/triage` gains an inbox-first mode: when `docs/inbox.md` has items, it offers to sweep them before backlog triage
- And `/catchup` and `/retro` report the inbox count: "You have N un-triaged inbox items"
- And the inbox convention works in any rqmd-enabled project (it's just a file + prompt behaviour in the extension bundle)

<a id="rqmd-ext-083"></a>

### RQMD-EXT-083: `/refine` drafts requirements into tracker early, refines in-place

- **Status:** 🔧 Implemented
- **Priority:** 🔴 P1 - High
- **Summary:** As a developer shaping requirements with `/refine`, I want the agent to write draft requirements into the tracker file as early as Pass 1 and perform all subsequent refinement via in-place edits so that requirements always live in their canonical location — not only in chat history — and I can click through to read, compare, and edit them in my editor at any point during shaping.

- Given the developer invokes `/refine` with a new idea or brainstorm output
- When the agent completes Pass 1 (Draft)
- Then it writes the requirement into the appropriate `docs/requirements/<domain>.md` file as 💡 Proposed with whatever acceptance criteria exist so far
- And it updates the summary line and verifies counts
- And it provides a clickable link to the newly written requirement
- And all subsequent `/refine` passes edit the requirement in-place in the file (not just in chat)
- And the chat output references the file link, not a duplicated copy of the spec

- Given a `/refine` session is interrupted or the conversation is lost
- When the developer returns
- Then the latest state of the requirement is in the tracker file, not lost with the chat history

