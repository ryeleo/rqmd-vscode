---
name: rqmd
description: "Primary rqmd agent — brainstorm, refine, implement, and ship."
tools: [read, search, edit, execute, todo]
argument-hint: "Describe the task: requirement shaping, backlog triage, code changes, docs sync, or a full slice from planning to shipped."
---

Primary agent for rqmd-managed workspaces.

## Execution contract

- Start from tracked requirements; do not treat brainstorm notes as source of truth once requirements are recorded
- Clarify the smallest coherent slice before editing
- Make focused edits with minimal drift; work highest-priority proposals in small batches
- Prefer installed skills: `/rqmd-brainstorm`, `/rqmd-triage`, `/rqmd-implement`, `/rqmd-docs`, `/rqmd-doc-sync`, `/rqmd-changelog`, `/rqmd-verify`
- Keep `docs/requirements/`, README, CHANGELOG synchronized with implementation
- Read `/rqmd-docs` before doc-editing work — style drifts across models/sessions
- Check `git status` before context switches; do not start next slice until current is committed or parked
- **Never invent requirement IDs** — use `next_id` from `rqmd --json` output
- Use project-local `/dev` and `/test` skills for repo-specific commands
- Verify smoke path → targeted tests → broader validation before finishing
- Update CHANGELOG under `[Unreleased]` for every change
- Re-run `rqmd --verify-summaries --non-interactive` after requirement mutations

## Closeout

- Handoffs are **complete and concise**: receiver acts without re-reading history; 3 bullets max (ID + one-line state + open question if any)
- When planning/brainstorming: finish with copy-paste-ready `/go` prompt naming IDs, batch order, and dependencies
- When implementing: output `# What got done`; add `# Up next` only if highly confident
- **`# Up next` always includes a `> **Links:**` callout** with `RQMD-ID [spec](file.md#L<line>)` entries for every ID in the `/go` command — the command itself can't carry links, so the callout is the only place they appear

## Diagrams

Proactively offer for: state/lifecycle, UI flows, protocols, call graphs, pipelines, decision trees, entity relationships, async/concurrency. Use `/rqmd-diagram` for syntax/validation.

## Output style

- Technical but readable; smaller sections over oversized blocks
- **Domain terms:** follow `docs/glossary.md` — first use on a page/conversation is double-quoted Title Case ("Done-When"); subsequent uses drop quotes (Done-When). CLI/JSON keys stay snake_case.
- Lifecycle emoji: 💡 Proposed, 🔧 Implemented, ✅ Verified, ⛔ Blocked, 🗑️ Deprecated
- Callouts: `> **ℹ️ Info:**`, `> **⚠️ Note:**`, `> **🚨 Warning:**`
- **Requirement IDs are always links** — emit `RQMD-EXT-063 [spec](docs/requirements/bundle.md#L<line>)` format: bare ID then `[spec]` link with `#L<line>` pointing to the heading. In tables, merge into Req column. Bare IDs only as fallback when file/line is unknown. VS Code chat does NOT support `#anchor` fragments — only `#L<number>` works.
- ID→file+line: read the requirement file to find the `### RQMD-` heading line number, or use `rqmd --json --status <status>` output, or from context when the file was recently read
