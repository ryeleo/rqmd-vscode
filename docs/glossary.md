# Glossary

Canonical rqmd domain terms. First use on any page or conversation: double-quoted Title Case ("Done-When"). Subsequent uses: Title Case without quotes (Done-When). CLI/JSON keys stay snake_case (`done_when`).

| Term | Definition |
|------|------------|
| Acceptance Criteria | Concrete conditions (Given/When/Then or Steps/Expected/Actual) that define when a requirement is satisfied. |
| Backlog | The set of tracked requirements not yet Implemented or Verified. |
| Brainstorm | Generative planning mode that explores ideas before they become tracked requirements. |
| Bundle | The installable package of agent instructions, prompts, and skills that an rqmd extension ships to a workspace. |
| Catchup | Session-start orientation that summarises where the developer left off. |
| Done-When | The acceptance-criteria section of a requirement that defines completion. |
| Drift | Unplanned deviation from the intended work slice during a session. |
| Go Prompt | The `/go` command that starts or continues the implementation loop. |
| Handoff | A concise summary (IDs + state + open questions) passed between sessions or agents. |
| Inbox | The `docs/inbox.md` append-only capture file for fleeting ideas awaiting triage. |
| Init Interview | The guided `/rqmd-init` chat that bootstraps rqmd in a new or existing repo. |
| Lifecycle Emoji | Status markers: 💡 Proposed, 🔧 Implemented, ✅ Verified, ⛔ Blocked, 🗑️ Deprecated. |
| Orphaned Requirement | A requirement marked 🔧 Implemented or ✅ Verified whose implementing code has been deleted or never existed — the spec describes behavior that is genuinely absent from the codebase. Contrast with Unannotated Requirement. |
| Pin | A durable context note stored in `docs/pins/` for decisions, reminders, or reference. |
| Proposal | A requirement in 💡 Proposed status — shaped enough to track but not yet implemented. |
| Quick Capture | The lowest-friction path to append an idea to the Inbox (VS Code command or `/brainstorm` short input). |
| Refine | The iterative `/refine` shaping loop that tightens a vague idea into an implementable spec. |
| Requirement ID | The unique `RQMD-<PREFIX>-<NNN>` identifier for a tracked requirement. |
| Retro | A structured post-work retrospective that reviews drift, classifies stalled work, and writes a session node. |
| Session Tree | A navigable `docs/sessions/` structure recording session nodes (brainstorm, implementation, retro, catchup). |
| Shaping | The process of turning a loose idea into a requirement with clear Acceptance Criteria. |
| Slice | A small coherent batch of 1–3 requirements worked in a single `/go` pass. |
| Smoke Path | The minimal manual or automated check that confirms basic functionality after a change. |
| Triage | The `/triage` ranking pass that selects the next Slice from the Backlog. |
| Unannotated Requirement | A requirement marked 🔧 Implemented or ✅ Verified whose code exists but lacks a `# RQMD-*` cross-reference comment linking back to the requirement ID. `--staleness` flags these separately from Orphaned Requirements so the fix is "add an annotation" not "consider deprecating." |
| User Story | A requirement written as "As a …, I want … so that …" to clarify who benefits and why. |
| Verify | Post-implementation validation: summaries, targeted tests, full suite, residual risk. |
| Xref | Cross-reference — a `# RQMD-*` comment in source or test code that links back to the requirement it implements. Used by `--staleness` to detect whether a requirement has living code behind it. JSON key: `xref_count`. |
