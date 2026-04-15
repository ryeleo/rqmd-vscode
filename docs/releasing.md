# rqmd VS Code Extension — Release Guide

Everything you need to publish the `ryeleo.rqmd` extension to the Visual Studio Marketplace without surprises.

## Overview

The publish pipeline is fully automated via GitHub Actions once:

1. The `VSCE_PAT` secret is valid and stored in the `vscode-marketplace` GitHub Environment.
2. The `package.json` version matches the release tag.
3. `CHANGELOG.md` contains a versioned entry for the release (e.g. `## [0.2.2]`).

If any of those three conditions fails, CI blocks the publish before touching the Marketplace.

---

## The VSCE_PAT — Getting It Right

The most common failure is a bad PAT. The Marketplace will return:

```
TF400813: The user 'aaaaaaaa-...' is not authorized to access this resource.
```

This zero UUID means the PAT was rejected entirely — either wrong scope, wrong organization access, or expired.

### How to create or refresh the PAT

1. Go to [dev.azure.com](https://dev.azure.com) → your Azure DevOps organization.
2. Click your avatar (top-right) → **Personal access tokens → New Token**.
3. Configure as follows:

   | Field | Value |
   |---|---|
   | **Name** | `vsce-rqmd-publish` (or any label) |
   | **Organization** | **All accessible organizations** ← critical |
   | **Expiration** | 1 year (max) |
   | **Scope** | Custom defined: **Marketplace → Manage** |

   > **🚨 Warning:** Selecting only your specific org instead of "All accessible organizations" causes the `aaaaaaaa...` error even though the PAT looks valid. The VS Code Marketplace lives in a separate Azure DevOps service collection that is only reachable via "All organizations".

4. Copy the token — it is shown only once.

### Store the PAT in the GitHub Environment

1. Go to `https://github.com/ryeleo/rqmd-vscode/settings/environments`.
2. Open the **`vscode-marketplace`** environment.
3. Under **Environment secrets**, add/update:
   - Name: `VSCE_PAT`
   - Value: the token you just copied.

---

## Release Checklist

Follow these steps in order. The validator will catch it if you skip step 3.

### 1. Bump version in `package.json`

```json
"version": "0.2.2"
```

> **⚠️ Note:** VS Code requires plain `x.y.z` semver. Suffixes like `rc1` are rejected by the extension manifest validator. If you want a pre-release publish, still use plain semver in `package.json` and use an `rcN` *tag* — the publish script maps `v0.2.2rc1` → `0.2.2` before comparing.

### 2. Roll `CHANGELOG.md`

Move all content from `[Unreleased]` into a new versioned section:

```markdown

## [Unreleased]

<a id="v0-2-2"></a>

## [0.2.2] - YYYY-MM-DD

### Added

- ...
```

The tag validator checks for `## [0.2.2]` and will block CI if it's missing.

### 3. Commit and push to `main`

```bash
git add package.json CHANGELOG.md
git commit -m "chore(release): prepare 0.2.2 - roll changelog"
git push origin main
```

### 4. Create the release tag and GitHub Release

Use the paired release script from `rqmd-cli` to create both product releases together:

```bash

# From rqmd-cli/ repo root

./scripts/gh-release-both.sh 0.2.2
```

Or manually:

```bash
VERSION="0.2.2"
ANCHOR="v${VERSION//./-}"

NOTES="Canonical changelog entries:
- rqmd CLI: https://github.com/ryeleo/rqmd/blob/main/CHANGELOG.md#${ANCHOR}
- rqmd VS Code extension: https://github.com/ryeleo/rqmd-vscode/blob/main/CHANGELOG.md#${ANCHOR}

These two products are released together for this version."

gh release create "v${VERSION}" \
  --repo ryeleo/rqmd-vscode \
  --title "v${VERSION}" \
  --notes "${NOTES}"
```

Publishing the GitHub Release fires the `release: published` workflow trigger, which runs `vsce publish`.

### 5. Monitor the Actions run

Go to `https://github.com/ryeleo/rqmd-vscode/actions` and watch the **publish-marketplace** run. A successful run ends with:

```
Publishing ryeleo.rqmd@0.2.2...
Extension URL: https://marketplace.visualstudio.com/items?itemName=ryeleo.rqmd
Published ryeleo.rqmd@0.2.2
```

---

## Pre-release Publishes (Optional)

If you want to publish a pre-release before rolling the stable changelog:

1. Keep `package.json` at the *base* version (`0.2.2`).
2. Push a tag like `v0.2.2rc1` (no GitHub Release needed).
3. CI detects the `v*rc*` tag pattern, runs `vsce publish --pre-release`.
4. The changelog check is **skipped** for rc tags.

---

## Troubleshooting

| Symptom | Cause | Fix |
|---|---|---|
| `aaaaaaaa-...` UUID error | PAT scope wrong or org set to single org | Regenerate PAT with "All organizations" + Marketplace → Manage |
| `The Personal Access Token verification has failed` | PAT expired | Refresh PAT, update the `VSCE_PAT` secret |
| `does not contain a versioned entry` | Forgot to roll changelog | Add `## [x.y.z] - date` section to CHANGELOG.md |

| `expects version 'x.y.z', but found '...'` | `package.json` version out of sync | Bump `package.json` to match the tag |
| Extension publishes but shows old content | VSIX built from stale files | Check `.vscodeignore` isn't excluding new skill/prompt files |

---

## Version Sync with rqmd CLI

Version numbers are kept in sync with the `rqmd` Python CLI package (`ryeleo/rqmd`). Both products should share the same version and be released together using `gh-release-both.sh`.

See [rqmd-cli/docs/releasing.md](https://github.com/ryeleo/rqmd/blob/main/docs/releasing.md) for the CLI-side checklist and the paired release script.
