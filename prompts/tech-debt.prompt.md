---
description: "rqmd (v0.2.9): Run staleness analysis and recommend tech-debt cleanup targets."
name: "tech-debt"
argument-hint: "Optional: 'deprecated-only' for CI check, domain filter like 'CORE', or threshold like '50'."
agent: "rqmd"
---

Tech-debt cleanup powered by staleness scoring.

- Run `/rqmd-staleness` skill to analyze the project
- Present findings grouped by severity: deprecated-but-alive → unreferenced → high-staleness
- Recommend a cleanup batch (3–5 items) with a ready-to-paste `/go` prompt
- `deprecated-only` → CI-style check, exits non-zero if deprecated requirements still have live code references
- `explain` → show scoring signal weights and configuration
- Domain filter → narrow to a specific requirement prefix (e.g. "CORE", "UI", "EXT")
- Threshold → adjust staleness cutoff (default ≥ 70)
