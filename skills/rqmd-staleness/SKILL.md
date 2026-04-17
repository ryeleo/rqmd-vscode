---
name: rqmd-staleness
description: Surface stale, orphaned, and deprecated-but-alive requirements using staleness scoring.
argument-hint: "Optional: domain filter, status filter, or 'deprecated-only' for CI-style check."
user-invocable: false
metadata:
  guide:
    summary: Run staleness analysis and present actionable cleanup recommendations.
---

Surface tech-debt hotspots from `rqmd --staleness --json` output. Present findings as a prioritized cleanup plan, not a raw data dump.

## Prerequisites

- `rqmd` CLI >= 0.2.9 (ships `--staleness`)
- Project has tracked requirements (`docs/requirements/` exists)
- Git history available (staleness signals depend on `git blame` and `git grep`)

## Workflow

1. **Run analysis:** `rqmd --staleness --json` — collect full staleness report
2. **Categorize findings** into three buckets:
   - 🔴 **Deprecated but alive** — 🗑️ Deprecated requirements with code cross-refs > 0. These are the highest-priority cleanup targets: dead specs with live code referencing them.
   - 🟡 **Implemented but unreferenced** — 🔧 Implemented requirements with zero code cross-refs. Possible orphans: the spec exists but nothing in the codebase mentions it.
   - 🟠 **High staleness score** — any requirement with staleness score ≥ 70. Catch-all for specs that have gone stale by multiple signals.
3. **Present findings** as a table sorted by staleness score descending, grouped by bucket
4. **Recommend cleanup batch** — pick the top 3–5 actionable items and draft a `/go` prompt

## JSON contract (RQMD-CORE-045)

The `--staleness --json` envelope:

```json
{
  "mode": "staleness",
  "requirements_dir": "docs/requirements",
  "requirement_count": 42,
  "requirements": [ ... ]
}
```

Each entry in `requirements`:

```json
{
  "id": "RQMD-CORE-012",
  "title": "Starter dummy requirement generation",
  "status": "Verified",
  "file": "docs/requirements/core-engine.md",
  "last_status_change": "2025-11-03",
  "status_age_days": 165,
  "xref_count": 2,
  "code_freshness": "2026-01-15",
  "code_freshness_days": 92,
  "staleness_score": 45.0,
  "breakdown": {
    "status_age": 13.6,
    "xref_count": 24.0,
    "code_freshness": 5.0,
    "status_flag": 10.0
  },
  "flags": []
}
```

- `staleness_score`: 0–100, higher = more stale
- `xref_count`: number of source files referencing this requirement ID (excludes `docs/requirements/`)
- `code_freshness` / `code_freshness_days`: most recent commit date touching referencing files
- `last_status_change` / `status_age_days`: date of last status-line edit from `git blame`
- `breakdown`: weighted sub-scores (sum ≈ composite)
- `flags`: semantic labels — `deprecated-but-alive`, `implemented-but-unreferenced`

Deprecated-only mode (`--staleness --deprecated-only --json`) sets `"mode": "staleness-deprecated"` and adds an `xrefs` array per requirement.

## Output format

### Quick summary line

```
📊 Staleness: 3 deprecated-but-alive, 5 unreferenced, 12 high-staleness (≥70)
```

### Detail table

| Score | ID | Status | Title | Signal |
|---|---|---|---|---|
| 98 | RQMD-FOO-007 | 🗑️ Deprecated | Legacy auth flow | deprecated-but-alive (4 xrefs) |
| 82 | RQMD-FOO-022 | 🔧 Implemented | Rate limiter | unreferenced (0 xrefs) |
| 71 | RQMD-FOO-003 | 🔧 Implemented | Config loader | stale 14 months |

### Cleanup recommendation

End with a `/go` prompt targeting the top cleanup items:

```
/go RQMD-FOO-007 RQMD-FOO-022 — deprecation cleanup and orphan review
```

## Flags and filters

- `deprecated-only` argument → run `rqmd --staleness --deprecated-only --json` instead (CI mode, exits non-zero on findings)
- `explain` argument → run `rqmd --staleness --explain` (or `--json`) to show signal weights and scoring documentation
- Domain filter → pass domain token to narrow output (e.g. "staleness for CORE domain only") — post-filter the JSON by `file` or `id` prefix
- Threshold → default ≥ 70 for "high staleness"; mention if user wants a different cutoff

## Edge cases

- No git history (fresh clone with `--depth 1`) → warn that blame/freshness signals are unavailable, score is partial
- No cross-refs found for any requirement → note that the project may not embed requirement IDs in source code (this is normal for some workflows)
- Empty staleness report (all scores < 20) → celebrate: "🎉 No significant staleness detected"
- `RuntimeError: staleness scoring requires a git repository` → not a git repo, tell user

## Done when

- Staleness report presented with categorized findings
- Top cleanup items identified with rationale
- `/go` prompt provided for the recommended cleanup batch
