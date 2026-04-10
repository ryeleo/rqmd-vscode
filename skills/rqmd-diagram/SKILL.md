---
name: rqmd-diagrams
description: Author, lint, and fix Mermaid diagrams in markdown docs so they render correctly in both VS Code and mmdc. Use whenever creating or editing stateDiagram-v2 or flowchart diagrams.
argument-hint: Name the markdown file(s) containing diagrams to validate or describe the diagram you need to create.
user-invocable: false
metadata:
  guide:
    summary: Produce Mermaid diagrams that pass mmdc validation and render cleanly in VS Code.
    workflow:
      - Author the diagram following the syntax rules below.
      - Run `mmdc -i <file.md>` to validate. Fix any parse errors and re-run until all charts show ✅.
      - Treat mmdc as the authoritative linter — VS Code's renderer is stricter than the CLI, so CLI passes are necessary but not always sufficient.
    examples:
      - pushd $(mktemp -d) && mmdc -i "$OLDPWD/docs/player-flows.md" 2>&1; popd
---

Use when creating, editing, or reviewing Mermaid diagrams in markdown.

## Validation

`mmdc` always writes SVGs — run from a temp directory to avoid polluting the repo:

```bash
pushd $(mktemp -d) && mmdc -i "$OLDPWD/<path/to/file.md>" 2>&1; popd
```

All charts must show ✅ before done. Install: `npm install -g @mermaid-js/mermaid-cli` (Node 18+).

> **🚨 Warning:** Never run `mmdc -i <file>` from inside the repo without the temp-dir wrapper.

## Syntax rules

| Rule | ✅ Correct | ❌ Wrong |
|------|-----------|----------|
| Line breaks | `A --> B : First<br>Second` | `A --> B : First\nSecond` |
| Node labels | `L[awaitingScorecardAccept = true]` | `L["CHOOSE then GO"]` (no `"` inside) |
| stateDiagram-v2 | `A --> B : implicit — no back handler` | `A --> B : (implicit: same handler)` (no second `:`) |

### Notes in stateDiagram-v2

```
note right of StateName
    Free-form text here
end note
```

## Diagram types

| Type | Keyword | Best for |
|------|---------|----------|
| State machine | `stateDiagram-v2` | Boolean flags, mode transitions, lifecycle |
| Flow | `flowchart TD/LR` | Execution paths, call chains, save/restore |

## Checklist

- [ ] `<br>` for label line breaks (no `\n`)
- [ ] No `"` inside node labels
- [ ] No second `:` in stateDiagram-v2 transitions
- [ ] `mmdc -i <file>` exits 0 with all ✅
- [ ] VS Code Mermaid preview renders without errors
