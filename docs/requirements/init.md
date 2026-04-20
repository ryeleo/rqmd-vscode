# Init and Bootstrap Requirements

Scope: Bundle bootstrap, legacy-init, interview flows, and onboarding guidance.

<!-- acceptance-status-summary:start -->
Summary: 2💡 14🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-009"></a>

### RQMD-EXT-009: Agent-driven bundle bootstrap chat

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The rqmd bundle bootstrap flow to be driveable through an AI-guided chat session so that bundle install can interview the user about the project's build, run, dev, and test commands instead of forcing all customization through manual file edits.

<a id="rqmd-ext-011"></a>

### RQMD-EXT-011: Legacy-repo init skill and workflow

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** An `init-legacy` AI skill or workflow that helps bootstrap rqmd from the repository's existing reality so that adoption can start from the current codebase, docs, backlog, and conventions instead of requiring a blank-slate scaffold.

<a id="rqmd-ext-012"></a>

### RQMD-EXT-012: Useful first-pass requirements folder for legacy repos

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The legacy-init flow to produce a useful first-pass `requirements/` folder that I can immediately start editing and using so that the resulting requirements docs reflect the repository's current product areas, workflows, and likely work streams instead of only a generic starter example.

<a id="rqmd-ext-013"></a>

### RQMD-EXT-013: Optional GitHub issue discovery during legacy init

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** The legacy-init workflow to try using `gh` to inspect repository issues when the GitHub CLI is available and authenticated so that rqmd can incorporate the existing issue backlog into its first-pass requirement suggestions instead of ignoring a major source of project intent.

<a id="rqmd-ext-014"></a>

### RQMD-EXT-014: Init-chat AI handoff prompt generation

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` init workflows to emit a ready-to-paste handoff prompt for an external AI assistant so that I can start the guided bootstrap experience by pasting one concise prompt instead of manually explaining the expected command flow.

<a id="rqmd-ext-015"></a>

### RQMD-EXT-015: Concise copy/paste init prompt UX

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to print a concise human-facing "paste this into your AI chat" prompt when requested so that the init-chat flow is understandable even when the user has not yet learned the JSON interview protocol.

<a id="rqmd-ext-016"></a>

### RQMD-EXT-016: Unified init workflow with heuristic routing

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai` to expose a single `init` workflow name instead of forcing me to choose between a "new" and "legacy" mental model up front so that init entry feels simple even when the tool needs to choose a different setup path behind the scenes.

<a id="rqmd-ext-017"></a>

### RQMD-EXT-017: Explicit legacy-init compatibility and override flag

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** An explicit compatibility path to force legacy-style initialization when needed so that repositories with strange layouts or incomplete heuristics are still easy to initialize intentionally.

<a id="rqmd-ext-018"></a>

### RQMD-EXT-018: Chat-first init entrypoint for new projects

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** `rqmd-ai init --chat` to be the canonical AI-facing onboarding entrypoint so that the recommended startup path is one clear command instead of a mix of `install`, `init-legacy`, and hand-written guidance.

<a id="rqmd-ext-019"></a>

### RQMD-EXT-019: Default init guidance favors AI chat flow

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The default help, onboarding guide output, and initialization hints to recommend the AI-chat workflow first so that the product teaches the strongest end-to-end flow by default instead of expecting users to discover it from scattered flags and examples.

<a id="rqmd-ext-020"></a>

### RQMD-EXT-020: Init interview recommends a project-specific ID prefix

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The `rqmd-ai init` interview to strongly recommend a short project-specific ID prefix instead of only generic fallbacks such as `REQ`, `RQMD`, or `AC` so that requirement IDs are easier to recognize, less likely to collide with other catalogs, and more meaningful in discussion and documentation.

<a id="rqmd-ext-021"></a>

### RQMD-EXT-021: Init interview exposes default-checked suggested choices

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** Multi-select init questions to declare which suggested or recommended options should start checked by default so that users can plainly see what the workflow intends to pick unless they actively uncheck those defaults.

<a id="rqmd-ext-022"></a>

### RQMD-EXT-022: Explicit interactive interview contract for receiving agents

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The payload to explicitly declare that the receiver should switch into a structured interactive interview mode so that the receiving AI presents a real one-question-at-a-time multi-choice session instead of summarizing the JSON and asking for freeform answers after every step.

<a id="rqmd-ext-027"></a>

### RQMD-EXT-027: Legacy-init installs local schema guidance into generated requirement indexes

- **Status:** 🔧 Implemented
- **Priority:** 🟠 P1 - High
- **Summary:** The generated `docs/requirements/README.md` or `requirements/README.md` to include the current local rqmd schema guidance that AI agents need during follow-up work so that the initialized repository contains a nearby, tool-owned schema reference instead of forcing humans or AI agents to rely on memory, external docs, or a missing side file.

<a id="rqmd-ext-069"></a>

### RQMD-EXT-069: `rqmd-init` scaffolds a `/release` skill during the interview

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer onboarding a project with `rqmd-init`, I want the interview to ask one release-workflow question (single repo or paired, preferred tag pattern) and generate a populated `skills/release/SKILL.md` alongside the `/dev` and `/test` skills, so that the "just release from CLI" path exists from day one without any manual skill authoring.
- Given the `rqmd-init` interview has reached the dev/test skill generation step
- When the agent discovers release scripts or CI/CD config (e.g. `Makefile`, `package.json` version field, `.github/workflows/release.yml`, any `*release*.sh`) or when the user answers "yes" to a prompted release-workflow question
- Then the agent generates `skills/release/SKILL.md` in focus-contract format, pre-filled with the confirmed release command, tag pattern, and repo targets
- And the skill is registered in `package.json` `chatSkills` if the repository is rqmd-vscode itself, or noted as a local skill for other repos
- And the interview skips the release step gracefully when no release signals are found and the user opts out

<a id="rqmd-ext-070"></a>

### RQMD-EXT-070: `rqmd-init` generates a `release.sh` stub for repos without a canonical release command

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer in the early rapid iteration phase of a project, I want `rqmd-init` to generate a minimal `scripts/release.sh` stub (single command: `gh release create vX.Y.Z --repo <owner>/<repo>`) when no release script already exists, so that an agent can cut a release autonomously by calling one command without manual setup.
- Given the `rqmd-init` interview has determined the release workflow and no existing `*release*.sh` or equivalent script is found
- When the user confirms they want a release stub generated
- Then the agent writes `scripts/release.sh` with a minimal `gh release create` invocation, executable (`chmod +x`), and a `# TODO: customize` header comment showing the repo slug to fill in

- And the generated `/release` skill references `./scripts/release.sh <version>` as the canonical release command
- And the stub is not generated if a release script already exists (no clobber)

