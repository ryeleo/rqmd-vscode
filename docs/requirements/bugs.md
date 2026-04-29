# Bugs

<!-- acceptance-status-summary:start -->
Summary: 1💡 0🔧 0✅ 0⚠️ 0⛔ 0🗑️
<!-- acceptance-status-summary:end -->


This file tracks project defects as requirements.

<a id="rqmd-bug-001"></a>

### RQMD-BUG-001: Catchup prompt not available in chat
- **Status:** 💡 Proposed
- **Type:** bug
- **Priority:** 🟠 P1 - High
- **Affects:** RQMD-EXT-072

#### Description
As a developer returning to a project, I can see that the `/catchup` prompt file exists in the extension source, but the prompt is not available in Copilot Chat, so the session re-orientation workflow cannot actually be invoked from the surface that claims to ship it.

#### Steps to Reproduce
1. Install or load the rqmd VS Code extension in a workspace.
2. Observe that `prompts/catchup.prompt.md` exists in the extension bundle and declares `name: "catchup"`.
3. Open Copilot Chat and try to invoke `/catchup`.
4. Inspect `package.json` and compare the `contributes.chatPromptFiles` list against the prompt files shipped in `prompts/`.

#### Expected Behavior
- `/catchup` is available in Copilot Chat because the extension contributes the shipped prompt file.
- The shipped prompt inventory and the contributed prompt inventory stay in sync.

#### Actual Behavior
- `/catchup` is not available in chat even though `prompts/catchup.prompt.md` exists in the repository.
- `package.json` omits `./prompts/catchup.prompt.md` from `contributes.chatPromptFiles`, so the prompt never becomes visible to VS Code.

#### Root Cause
- The extension ships the prompt file but does not register it in `package.json` under `contributes.chatPromptFiles`.
- The prompt contribution list appears to be maintained manually, which allowed the prompt file and the manifest to drift.

#### Acceptance Criteria
- [ ] Bug is fixed
- [ ] Regression test added
