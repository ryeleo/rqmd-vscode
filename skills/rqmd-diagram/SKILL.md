---
name: rqmd-diagrams
description: Author, lint, and fix Mermaid diagrams in markdown docs so they render correctly in both VS Code and mmdc. Use whenever creating or editing stateDiagram-v2 or flowchart diagrams.
argument-hint: Name the markdown file(s) containing diagrams to validate or describe the diagram you need to create.
user-invocable: true
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

Use this skill when creating, editing, or reviewing Mermaid diagrams in any markdown file.

## Validation command

`mmdc` has no lint-only mode — it always writes output SVGs. Run it from a temp directory
so the generated files never land in the repo:

```bash
# Bash / Git Bash (preferred)
pushd $(mktemp -d) && mmdc -i "$OLDPWD/<path/to/file.md>" 2>&1; popd

# PowerShell
$tmp = New-TemporaryFile | Split-Path; mmdc -i "$PWD\<path\to\file.md>" 2>&1; Remove-Item $tmp -Recurse -Force
```

Run after every edit. All charts must show ✅ before the work is done. If mmdc is not
installed: `npm install -g @mermaid-js/mermaid-cli` (requires Node 18+).

> **🚨 Warning:** Never run `mmdc -i <file>` from inside the repo directory without the
> `pushd/popd` temp-dir wrapper — it will write one SVG per diagram into the current
> working directory, polluting the workspace.

## Syntax rules (learned from VS Code + mmdc compatibility)

### Multi-line labels — use `<br>`, never `\n`
Both the VS Code renderer and mmdc require `<br>` for line breaks inside node labels and
transition descriptions. Literal `\n` is not rendered.

```
✅  A --> B : First line<br>Second line
❌  A --> B : First line\nSecond line
```

### No double quotes inside node labels
Double quotes inside `[]`, `()`, `{}` node labels cause a parse error in flowcharts.
Use single quotes, backtick-style prose, or simply omit the quotes.

```
✅  K -- Yes --> L[awaitingScorecardAccept = true<br>CHOOSE then GO]
❌  K -- Yes --> L[awaitingScorecardAccept = true<br>"CHOOSE then GO"]
```

### No second colon inside stateDiagram-v2 transition labels
In `stateDiagram-v2`, the first `:` after a state name starts the transition label.
A second `:` in the label body is parsed as a state-description separator and raises a
`DESCR` parse error in the stricter VS Code renderer.

```
✅  A --> B : implicit — no back handler in rogue mode
❌  A --> B : (implicit: same back handler not shown)
```

This restriction applies only to `stateDiagram-v2`. Flowchart (`flowchart TD/LR`) edge
labels do not have this limitation.

### Arrow style in flowcharts
Use `-->` for normal edges and `-- label -->` or `-- label -->` for labelled edges.
Avoid mixing `->` (single dash) with `-->`.

### Note blocks in stateDiagram-v2
Notes must reference an existing state name and use the exact keyword form:

```
note right of StateName
    Free-form text here
end note
```

The `note right of` / `note left of` form is required — inline note shorthand is not
supported in `stateDiagram-v2`.

## Diagram types used in this repo

| Type | Keyword | Best for |
|---|---|---|
| State machine | `stateDiagram-v2` | Boolean flags, mode transitions, lifecycle states |
| Call graph / flow | `flowchart TD` or `flowchart LR` | Execution paths, call chains, save/restore flows |

## Workflow checklist

- [ ] `<br>` used for all label line breaks (no `\n`)
- [ ] No double quotes inside node label brackets
- [ ] No second `:` inside `stateDiagram-v2` transition labels
- [ ] `mmdc -i <file>` exits 0 with all charts showing ✅
- [ ] Diagrams render without errors in the VS Code Mermaid preview
