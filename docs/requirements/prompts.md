# Prompt Suite Requirements

Scope: Installed prompt entrypoints (`/go`, `/bug`, `/commit-and-go`), agent naming, and deprecated agent variants.

<!-- acceptance-status-summary:start -->
Summary: 0💡 5🔧 0✅ 0⚠️ 0⛔ 2🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-025"></a>

### RQMD-EXT-025: Long-running priority-first development agent

- **Status:** 🗑️ Deprecated
- **Priority:** 🟠 P1 - High
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-longrunning` agent variant that explicitly tries to continue making progress for as long as feasible so that the agent works proposed requirements in priority order, keeps reassessing the backlog after each validated batch, and stops only when it reaches a real blocker, exhausts feasible work, or completes the active slice.

> Behavior absorbed into unified `rqmd` agent via `/go N` (slice count argument). No separate agent variant needed.

<a id="rqmd-ext-026"></a>

### RQMD-EXT-026: Easy-first low-hanging-fruit development agent

- **Status:** 🗑️ Deprecated
- **Priority:** 🟡 P2 - Medium
- **Superseded by:** RQMD-EXT-034
- **Summary:** Rqmd to ship a `rqmd-dev-easy` agent variant that focuses on low-risk, high-confidence requirement slices first so that the agent preferentially picks low-hanging-fruit proposed requirements where it can make clean progress with minimal exploratory risk.

> Behavior absorbed into unified `rqmd` agent via `/go easy-win` (constraint argument). No separate agent variant needed.

<a id="rqmd-ext-032"></a>

### RQMD-EXT-032: Prompt-first single-agent bundle entrypoints

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to install focused prompt entrypoints such as `/go` alongside one primary implementation agent so that the default user experience can stay centered on `rqmd` instead of forcing users to choose among several agent variants up front.

<a id="rqmd-ext-033"></a>

### RQMD-EXT-033: Installed prompt suite for common rqmd actions

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Rqmd to ship a visible suite of focused prompts for common actions such as go, next, brainstorm, docs passes, pinning, and ship checks so that I can discover and invoke the most common rqmd workflows quickly without memorizing the lower-level skill names or choosing among multiple agents up front.

<a id="rqmd-ext-034"></a>

### RQMD-EXT-034: Count-aware go prompts and commit-per-slice variant

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Prompt arguments like `/go 10` to mean "work through up to 10 validated slices" and a separate `/commit-and-go` prompt for explicitly commit-authorized long runs so that long-running prompt usage can be more expressive than a single slice without forcing me to switch to a different agent variant.

<a id="rqmd-ext-045"></a>

### RQMD-EXT-045: Rename primary agent from `rqmd-dev` to `rqmd`

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The primary agent to be named `rqmd` instead of `rqmd-dev`, since it is the agent I interact with 95% of the time and the `-dev` suffix makes it sound like a secondary internal tool so that `rqmd` becomes the obvious, default agent name across all projects that install the bundle.

<a id="rqmd-ext-049"></a>

### RQMD-EXT-049: `/bug` prompt for quick bug filing from chat context

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** To type `/bug` and have the agent automatically draft a tracked bug requirement from the conversation context so that filing a bug is zero-friction — no template hunting, no manual ID allocation, no asking permission — the agent just writes it to the appropriate domain file and tells me the ID.
- Given a chat session where a defect was discussed
- When the user invokes `/bug`
- Then the agent reviews conversation context, runs `rqmd-ai --json` to discover the next available ID and best-fit domain file, and writes a complete bug requirement using the Steps to Reproduce / Expected / Actual / Root Cause template with `type: bug` and an `affects:` cross-reference when identifiable.
- And the agent appends the requirement directly to the domain file without asking for confirmation.
- And the prompt file lives at `.github/prompts/bug.prompt.md` in the workspace and in the bundle at `src/rqmd/resources/bundle/.github/prompts/bug.prompt.md`.

