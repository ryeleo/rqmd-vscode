# Session and Retrospective Requirements

Scope: Session tree structure, `/retro` retrospectives, `/catchup` orientation, and session-aware coaching.

<!-- acceptance-status-summary:start -->
Summary: 4💡 3🔧 0✅ 0⚠️ 0⛔ 1🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-064"></a>

### RQMD-EXT-064: Post-implementation `/retro` prompt

- **Status:** 🗑️ Deprecated
- **Priority:** 🟡 P2 - Medium
- **Superseded by:** RQMD-EXT-071
- **Summary:** As a developer who just shipped a batch, I want a `/retro` prompt that reviews what happened and flags drift — untracked changes, skipped refinement, requirements that jumped Proposed → Implemented — so that I build awareness of where my process slipped without blocking velocity.

> Original sketch — fully shaped as RQMD-EXT-071 with drift categories, classification protocol, and session tree integration.

<a id="rqmd-ext-065"></a>

### RQMD-EXT-065: Session-start orientation shows backlog health

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer starting a new chat session in an rqmd workspace, I want the agent to proactively show backlog health (in-progress count, proposed count, recent drift indicators like "last session implemented 3 items without refinement") so that I get a quick orientation before diving in.

<a id="rqmd-ext-071"></a>

### RQMD-EXT-071: `/retro` prompt — structured post-work retrospective

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer who just finished a `/go` batch or a working session, I want a `/retro` prompt that reviews what happened, classifies session drift, and writes a retro node to the session tree, so that I build awareness of where my process worked or slipped and leave a clean handoff for the next session.

#### Design principle: CLI + Agent inseparable

- Heavy lifting (diffing requirement statuses, identifying changed files, cross-referencing) belongs in `rqmd` CLI. The agent interprets, presents, and asks follow-up questions.
- Future CLI support: `rqmd --json --diff-since <timestamp>` or `rqmd --json --changed` to surface requirements whose status changed since a given point. Until then, the agent manually diffs `git diff docs/requirements/` and parses status lines.

#### Data sources

- **Git:** `git diff --stat` (uncommitted) + `git log --oneline --since=<session-start>` (commits this session)
- **Requirement statuses:** `rqmd --json --non-interactive` (current snapshot; agent diffs against session tree's starting state)
- **Session tree:** Current `docs/sessions/` file — what the developer intended to work on (from `brainstorm`/`implementation` nodes)

#### Drift categories

- **Untracked changes** (⚠️ informational): Files in `git diff` with no requirement link. Could be fine (config, formatting) or a sign of vibe-coding. Agent flags; dev decides.
- **Skipped refinement** (⚠️ informational): Requirement went 💡→🔧 with no `/refine` session node. Not always wrong but the pattern should be visible.
- **Scope expansion** (📋 neutral): Requirements touched that weren't in the original `/go` slice. Not inherently bad — adjacent work discovered during implementation is natural. Agent reports factually without judgment.
- **Stalled work** (🔍 classify + confirm): A requirement named in an `implementation` node is still 💡 Proposed at retro time. Agent classifies with a best guess based on context, then confirms:
  - **Deferred:** pivoted to higher-priority work (agent can infer from session tree showing a pivot node)
  - **Blocked:** hit a dependency (agent can infer from conversation mentions of blockers)
  - **Cancelled:** decided not to do it (agent can infer from explicit "let's not" in conversation)
  - **Unknown:** no clear signal — agent asks: "You started EXT-075 but it's still 💡. Looks deferred — sound right?"

#### Agent classification protocol

- The agent SHOULD make a first-pass classification based on session tree, conversation context, and requirement statuses
- Present the classification with a confidence signal: "EXT-075 looks **deferred** — you pivoted to EXT-074 mid-session. Sound right?"
- Only ask open-ended "what happened?" when genuinely unsure
- Act on confirmed classifications: mark ⛔ Blocked, 🗑️ Deprecated, or leave as 💡 deferred

#### Output format

- `## What got done` — requirements completed with linked IDs

- `## Drift` — categorized drift items with severity emoji

- `## What's next` — suggested next actions (top 3)

- Stalled items appear with agent's classification and a confirm prompt

#### Session tree integration

- `/retro` writes a node of type `retro` to the current session file
- Node body contains compressed retro summary (full output goes to chat)
- If no session file exists, `/retro` creates one (slug: `retro`)
- Agent notifies: `> 📝 Recorded session node N007: "session retro" (retro)`

#### Edge cases

- **No git changes:** retro still runs against session tree + statuses. Output: "No code changes — this was a planning/shaping session."
- **No session tree file:** graceful degradation — drift detection uses only git + statuses, notes session tracking wasn't active.
- **Multiple `/retro` per session:** each writes a new `retro` node; earlier retros are preserved as history.

#### ## Done when

- Agent can run `/retro` and produce three-section output (got done / drift / next)
- Drift detection covers all 4 categories with appropriate severity
- Agent classifies stalled work with confidence signal before asking
- A `retro` node is written to the session file with inline notification
- Output uses linked requirement IDs
- Prompt lives at `prompts/retro.prompt.md`
- [RQMD-EXT-064](docs/requirements/bundle.md#rqmd-ext-064) is deprecated as superseded

<a id="rqmd-ext-072"></a>

### RQMD-EXT-072: `/catchup` prompt — re-orientation when returning

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer returning to a project after an absence (hours or days), I want a `/catchup` prompt that reads the previous session tree, `git status`, and backlog health and gives me a concise "here's where you left off" orientation, so that I can resume productively without re-reading chat history.
- Given a developer invokes `/catchup` or the agent detects a prolonged absence and suggests it
- When the agent runs the catch-up
- Then it reads the most recent session file from `docs/sessions/`, the current `git status`, and the backlog summary from `rqmd --json --non-interactive`
- And it presents: last session's retro summary (if it exists), what's in-progress, uncommitted changes, and the top 3 suggested next actions
- And it writes a session-tree node of type `catchup` to start the new session file
- And the prompt lives at `prompts/catchup.prompt.md` in the extension bundle

<a id="rqmd-ext-073"></a>

### RQMD-EXT-073: Retro nudge timer — time-aware coaching via VS Code setting

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer deep in a `/go` loop, I want the extension to track elapsed session time and gently suggest a `/retro` after a configurable interval, so that I build the habit of periodic reflection instead of heads-down marathons.
- Given the `rqmd.retroNudgeHours` VS Code setting is configured (default: 2)
- When the developer has been in an active session for longer than the configured interval without invoking `/retro`
- Then the extension appends a subtle tip to the next agent response: `> 💡 tip: You've been going for ~Nh — good time for /retro?`
- And the nudge appears at most once per interval (not on every response)
- And setting `rqmd.retroNudgeHours` to `0` disables the nudge entirely
- And the timer resets after a `/retro` invocation or a detected idle gap (>1h with no chat messages)
- And when the session is long (e.g. >4h or past midnight local), the agent may shift to a warmer, playful tone — casual language, Python-flavoured easter eggs, gentle humour — signalling "I see you, please rest" without being preachy

<a id="rqmd-ext-074"></a>

### RQMD-EXT-074: Session tree — navigable conversation structure in `docs/sessions/`

- **Status:** 💡 Proposed
- **Priority:** 🟠 P1 - High
- **Summary:** As a developer who wants to revisit earlier decisions or understand "how did we get here?", I want each working session to produce a structured tree of decision/insight/topic nodes in a git-tracked markdown file, so that the agent and I can navigate the conversation history by walking the tree rather than re-reading flat chat transcripts.

#### File format

- One file per session: `docs/sessions/YYYY-MM-DD-<slug>.md` where slug is 2-3 words from the first topic (e.g. `2026-04-14-retro-catchup-brainstorm.md`)
- Session file opens with `# Session: <title>` and a `<!-- session-start: ISO-timestamp -->` comment

- Nodes are `##` headings within the file, sequentially numbered: `## N001:`, `## N002:`, etc.

#### Node schema

- **Type** (required): `brainstorm` | `decision` | `insight` | `turning-point` | `implementation` | `retro` | `catchup`
- **Parent** (required): `—` for roots, `N001` etc. for children. Always exactly one parent (tree structure).
- **Related** (optional): Cross-links to other nodes, files, or requirement IDs. Makes the tree a DAG when present.
- **Reqs** (optional): Requirement IDs touched or discussed at this node.
- **Time** (required): ISO 8601 timestamp.
- **Body** (required): 1-3 sentences max. What happened, what was decided/realized. Not a transcript. Use `See also:` link if more context exists elsewhere.
- **Children are implicit** — derived from `Parent:` references. No `Children:` field (avoids duplicate state that drifts).

#### What triggers a new node

- A decision is made → `decision`
- An insight crystallizes → `insight`
- The user or agent pivots direction → `turning-point`
- A brainstorm topic opens → `brainstorm`
- A `/go` batch starts → `implementation`
- `/retro` runs → `retro`
- `/catchup` runs → `catchup`
- **NOT triggers:** routine file edits, searches, test runs, reading files — only semantically meaningful moments

#### Automatic writing with notification

- The agent writes nodes **automatically** without asking permission
- After writing a node, the agent informs the user inline: `> 📝 Recorded session node N003: "conversation structure > summary" (insight)`
- The notification is a single `>` blockquote line — lightweight, skimmable, not blocking

#### "Go back" navigation protocol

- Given the user says "wait, let's go back to where we decided X"
- The agent reads the current session file and finds the matching node (by keyword, node number, or requirement ID)
- Traces the path from the current node to the target via `Parent:` chain
- Reports: "We got here via N001 → N003 → N005. Recommend reconsidering from N003 or N005."
- Creates a **new** node branching from the target's parent — the old branch stays as history, not overwritten
- Reconsiderations are naturally recorded as branches in the tree

#### Session file lifecycle

- **Created by:** first node of a new session (often `/catchup` or first `/brainstorm`)
- **Multiple per day:** yes — one file per session, not per day
- **Closed by:** `/retro` writes a final `retro` node, or the file simply stops growing
- **Git-tracked:** always committed alongside the work it describes
- **Session boundary detection:** TBD — to be shaped separately (see open question below)

#### ## Done when

- Agent can create a `docs/sessions/` file and write nodes to it during a working session
- Each node follows the schema above with required fields
- Agent notifies user of each recorded node via inline `>` blockquote
- Agent can trace `Parent:` chains and report navigation paths when user asks to "go back"
- `/retro` and `/catchup` both read and write to session files
- `rqmd-history` skill (RQMD-EXT-075) teaches the agent the full protocol

#### Open

- Session boundary detection: what starts a new session file? `/catchup`? Idle gap? Explicit command? Needs its own brainstorm pass.

<a id="rqmd-ext-075"></a>

### RQMD-EXT-075: `rqmd-history` skill — session tree reading and navigation

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As an agent working in an rqmd session, I need a skill that teaches me how to read, write, and navigate session tree files, so that `/retro`, `/catchup`, and conversational "go back to X" navigation all work consistently against the same data structure.
- Given the `rqmd-history` skill is loaded
- When the agent needs to read, write, or navigate session tree nodes
- Then the skill defines: the session file location (`docs/sessions/`), the node schema, when to create new nodes (decisions, insights, turning points — not routine edits), how to trace parent/child paths, and the "go back" protocol for revisiting earlier decisions
- And the skill populates `skills/rqmd-history/SKILL.md` in the extension bundle
- And the skill teaches the agent to keep session files concise — only decisions, insights, and turning points, not every search or edit

<a id="rqmd-ext-081"></a>

### RQMD-EXT-081: `/retro` tech-debt drift category

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer running `/retro` after a work session, I want the retrospective to include a "Tech debt accrual" drift category that surfaces hacks, workarounds, and dead code noticed during the session so that debt observations feed automatically into the next `/tech-debt-sweep`.

- Given the developer runs `/retro` after a session
- When the retro classifies drift findings
- Then it includes a fifth drift category: **"Tech debt accrual"** — "Did we work around something, leave a hack, skip a cleanup, or notice dead code we didn't address?"
- And any findings in this category are appended to `docs/inbox.md` with a `[tech-debt]` tag prefix: `- [tech-debt] <finding>`
- And the next `/tech-debt-sweep` picks up `[tech-debt]`-tagged inbox items as pre-seeded input
- And `/retro` summary includes a debt accrual count: "Tech debt observations: N (added to inbox)"

