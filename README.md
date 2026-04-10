# rqmd — AI Agent Bundle

**Requirements Driven Development for Copilot Chat.** The rqmd extension brings the rqmd workflow into VS Code as installable prompts, skills, and agent modes for GitHub Copilot Chat.

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/ryeleo.rqmd?label=VS%20Marketplace&logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=ryeleo.rqmd)
[![PyPI](https://img.shields.io/pypi/v/rqmd?label=PyPI&logo=pypi)](https://pypi.org/project/rqmd/)

## Requirements

- **VS Code** 1.115 or later
- **GitHub Copilot Chat** installed and signed in
- **rqmd CLI** installed (`uv tool install rqmd` or `pipx install rqmd`)
- **mermaid-cli** *(optional)* — required only if you use the `rqmd-diagrams` skill to validate Mermaid diagrams. [Install instructions →](https://github.com/mermaid-js/mermaid-cli#installation)

## What's included

Once installed, the following are immediately available in Copilot Chat.

### Slash commands (prompts)

| Command | What it does |
|---|---|
| `/go` | Start or continue the implementation loop |
| `/next` | Pick the highest-priority feasible slice and work it |
| `/brainstorm` | Turn loose ideas into ranked requirement proposals |
| `/refine` | Refine existing requirements through focused discussion |
| `/bug` | File a tracked bug requirement from the current chat context |
| `/commit` | Create a well-structured git commit for the current work |
| `/commit-and-go` | Commit each validated slice and keep going |
| `/polish-docs` | Run a documentation quality or sync pass |
| `/refactor` | Improve readability, maintainability, or performance |
| `/pin` | Capture durable context or decision notes |
| `/ship-check` | Release readiness pass — call out blockers |
| `/feedback` | Submit improvement feedback to the rqmd team |

### Agent modes

| Agent | Role |
|---|---|
| `rqmd` | Requirements and project management — brainstorm, triage, refine, and hand off implementation tasks |
| `rqmd` | Primary agent — brainstorm, refine, implement, and ship. Full range of rqmd work from planning to production. |

### Skills

16 domain skills available in agent mode, including `rqmd-implement`, `rqmd-triage`, `rqmd-brainstorm`, `rqmd-verify`, `rqmd-changelog`, `rqmd-doc-sync`, and more.

## What rqmd is for

rqmd is built for requirement-first development with Copilot Chat:

- Capture product and implementation work as tracked requirements.
- Brainstorm and refine proposals before coding.
- Hand implementation slices to a focused coding agent.
- Keep requirement docs, changelogs, and shipped behavior aligned.

## Getting started

1. **Install the rqmd CLI:**

   ```bash
   uv tool install rqmd
   # or
   pipx install rqmd
   ```

2. **Install this extension** from the VS Code Marketplace.

3. **Initialize a project** via the Command Palette (`⇧⌘P`):

   ```
   rqmd: Initialize Project
   ```

   This sets up the project-side rqmd structure so the extension and CLI can work against the same requirement catalog.

4. **Start working** with `/go`, `/next`, or `/brainstorm` in Copilot Chat.

## How it works

The extension contributes prompts, skills, and agent definitions via VS Code's declarative `chatPromptFiles`, `chatSkills`, and `chatAgents` contribution points. VS Code core discovers them automatically — no proposed API, no runtime overhead.

Per-project overrides such as custom `/dev` and `/test` skills can still live alongside your repo-specific Copilot instructions. Upgrading the shared rqmd bundle is just an extension update.

## Version sync

Extension version numbers are kept in sync with the [`rqmd` Python CLI package](https://pypi.org/project/rqmd/). Extension `0.2.2` pairs with `rqmd` CLI `0.2.2`.

## Links

- [rqmd on PyPI](https://pypi.org/project/rqmd/)
- [VS Code extension repository](https://github.com/ryeleo/rqmd-vscode)
- [rqmd CLI repository](https://github.com/ryeleo/rqmd)
- [Changelog](CHANGELOG.md)
