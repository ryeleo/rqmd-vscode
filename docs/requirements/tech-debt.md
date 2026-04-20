# Tech Debt and Archive Requirements

Scope: Tech-debt sweep, staleness surface, `/archive` for deprecated requirements, and cleanup workflows.

<!-- acceptance-status-summary:start -->
Summary: 3💡 1🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->

<a id="rqmd-ext-079"></a>

### RQMD-EXT-079: `/tech-debt-sweep` prompt — guided multi-pass codebase debt triage with auto-fix

- **Status:** 💡 Proposed
- **Priority:** 🔴 P1 - High
- **Summary:** As a developer returning to a project (or noticing accumulated cruft), I want `/tech-debt-sweep` to walk me through a structured multi-pass debt detection and cleanup so that I methodically reduce maintenance burden without missing categories or breaking things.

- Given the developer invokes `/tech-debt-sweep` in a workspace with rqmd tracking
- When the sweep starts
- Then it creates an empty git checkpoint commit: `tech-debt-sweep: checkpoint before sweep`
- And it runs these detection passes in order:
  1. **Deprecated cross-ref** — find live code referencing 🗑️ Deprecated requirement IDs (consumes `rqmd --staleness --json` when available, falls back to grep)
  2. **Dead code scan** — identify modules/functions imported but never called, or gated behind deprecated features
  3. **Orphaned test detection** — tests exercising deprecated features that don't cover live behavior (but skip tests that *test deprecation behavior itself*)
  4. **Stale doc inventory** — requirement files, brainstorm notes, pins referencing removed/deprecated features
  5. **Dependency hygiene** — unused packages in `pyproject.toml` / `package.json`
- And for each finding, it assigns a removal difficulty: **trivial** / **moderate** / **surgical**
- And **trivial** items (unused imports, dead references, orphaned docs) are auto-fixed immediately with a brief confirmation per fix
- And **moderate/surgical** items are reported as a ranked summary with staleness scores
- And at the end, it commits all auto-fixes: `tech-debt-sweep: auto-fixed N items`
- And remaining items are offered as draft 💡 Proposed requirements (only for surgical items that need real planning)
- And the sweep outputs a concise `# What got cleaned` summary, not a separate report document
- And code kept intentionally for backward compat can use a `# keep(reason)` inline annotation to escape detection
- And in multi-root workspaces, the sweep targets one repo at a time (user picks which)
- And if nothing is found, it confirms "clean sweep, no debt detected" and skips the commit

<a id="rqmd-ext-080"></a>

### RQMD-EXT-080: `/archive` prompt — retire deprecated requirement docs

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer with fully-deprecated requirement documents, I want `/archive` to move them to `docs/requirements/archived/` and update cross-references so that deprecated specs stop polluting the active workspace while remaining searchable in git.

- Given the developer invokes `/archive` (optionally with a filename or domain prefix)
- When targeting a requirement doc where **all** requirements are 🗑️ Deprecated
- Then the file is moved to `docs/requirements/archived/<filename>`
- And any cross-references in other docs (links, ID mentions) are updated to point to the new path
- And a one-line redirect comment is left at the original location if other docs referenced it: `<!-- Archived: see archived/<filename> -->`
- And `rqmd` CLI excludes `docs/requirements/archived/` from default processing (summary counts, `--json` output, verify-summaries)
- And the archived file retains its deprecation banner and all content (no data loss)

- Given a doc has a **mix** of deprecated and active requirements
- When the developer invokes `/archive` on that doc
- Then the agent lists the active requirements and offers two collaborative paths:
  - **Deprecate:** "Deprecate RQMD-X-001, RQMD-X-003, RQMD-X-007? (They'll be archived with the rest)"
  - **Split:** "Move RQMD-X-001, RQMD-X-003, RQMD-X-007 to a new file `<domain>-active.md` and archive the rest?"
- And the user picks one (or edits the suggestion), and the agent executes it
- And if splitting, the new file gets a proper header, summary line, and anchor IDs

<a id="rqmd-ext-082"></a>

### RQMD-EXT-082: `/archive` for individual requirements across domains

- **Status:** 💡 Proposed
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer who has deprecated individual requirements scattered across multiple domain docs, I want `/archive RQMD-X-001, RQMD-Y-023, RQMD-Z-005` to extract those specific requirements and consolidate them into the archived folder so that I can clean up piecemeal without waiting for an entire domain to go deprecated.

- Given the developer invokes `/archive RQMD-UNDO-007, RQMD-CORE-012, RQMD-EXT-003` (a list of IDs from different domain docs)
- When all listed requirements have status 🗑️ Deprecated
- Then each requirement block (heading + all metadata/criteria lines) is removed from its source file
- And the source file's summary line is recalculated
- And all extracted requirements are appended to `docs/requirements/archived/<domain>.md` (one archived file per original domain, created if needed)
- And archived files have a header: `# Archived: <Domain Name>` with deprecation banner and summary line
- And cross-references to the moved IDs are updated to point to their new archived location

- Given one or more listed IDs are **not** 🗑️ Deprecated
- When the developer invokes `/archive` with that list
- Then the agent flags the non-deprecated ones: "RQMD-X-001 is still 🔧 Implemented — deprecate it first, or remove it from the list?"
- And proceeds with the rest after the user confirms

- Given extracting requirements would leave a domain doc **empty** (zero remaining requirements)
- When the extraction completes
- Then the now-empty source doc is itself moved to `archived/` (don't leave a zero-requirement file behind)

<a id="rqmd-ext-087"></a>

### RQMD-EXT-087: `/rqmd-staleness` skill and `/tech-debt` prompt — surface tech-debt hotspots

- **Status:** 🔧 Implemented
- **Priority:** 🟡 P2 - Medium
- **Summary:** As a developer wanting to clean up stale requirements and dead code references, I want a bundled `/rqmd-staleness` skill and `/tech-debt` prompt that wrap `rqmd --staleness --json` output into categorized findings and actionable cleanup batches, so that tech-debt triage is a single command away in any rqmd-managed project.

- Given a repository has rqmd installed with staleness support (RQMD-CORE-045) and git history available
- When the agent invokes `/tech-debt` (or the skill `/rqmd-staleness` is called internally)
- Then the skill runs `rqmd --staleness --json` and parses the structured output
- And findings are categorized into three buckets: **deprecated-but-alive** (🗑️ status with code xrefs > 0), **implemented-but-unreferenced** (🔧 status with zero code xrefs), and **high-staleness** (score ≥ 70)
- And the output is a summary line, a detail table sorted by staleness score, and a recommended cleanup `/go` prompt targeting the top 3–5 items
- And the `deprecated-only` argument runs `rqmd --staleness --deprecated-only --json` for CI-style checks (non-zero exit on findings)
- And domain and threshold arguments allow filtering and tuning the report
- And the skill integrates with `/rqmd-triage` — when staleness data is available, triage can factor staleness scores into backlog ranking

