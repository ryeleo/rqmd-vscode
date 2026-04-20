#!/usr/bin/env python3
"""Split bundle.md into domain files based on Option B clusters."""
import re
from pathlib import Path
from collections import OrderedDict

REQS_DIR = Path(__file__).resolve().parent.parent / "docs" / "requirements"
BUNDLE = REQS_DIR / "bundle.md"

# --- Cluster assignments: ID number -> target file ---
CLUSTERS = {
    # init.md — Init, bootstrap, onboarding
    "init.md": {
        "title": "Init and Bootstrap Requirements",
        "scope": "Bundle bootstrap, legacy-init, interview flows, and onboarding guidance.",
        "ids": {9,11,12,13,14,15,16,17,18,19,20,21,22,27,69,70},
    },
    # bundle-lifecycle.md — Bundle install, versioning, metadata, release
    "bundle-lifecycle.md": {
        "title": "Bundle Lifecycle Requirements",
        "scope": "Bundle install, upgrade, versioning, provenance metadata, and release workflow.",
        "ids": {1,5,6,7,35,36,84,85,86},
    },
    # shaping.md — Requirement shaping, brainstorm, refinement
    "shaping.md": {
        "title": "Shaping and Refinement Requirements",
        "scope": "Requirement authoring, brainstorm workflows, `/refine` shaping loops, and inbox quick-capture.",
        "ids": {2,3,4,23,46,47,48,61,62,63,77,83},
    },
    # prompts.md — Prompt suite, agent naming, go/commit
    "prompts.md": {
        "title": "Prompt Suite Requirements",
        "scope": "Installed prompt entrypoints (`/go`, `/bug`, `/commit-and-go`), agent naming, and deprecated agent variants.",
        "ids": {25,26,32,33,34,45,49},
    },
    # feedback.md — Feedback and telemetry
    "feedback.md": {
        "title": "Feedback and Telemetry Requirements",
        "scope": "User-driven rqmd product feedback, telemetry skills, and GitHub issue creation from feedback sessions.",
        "ids": {42,43,44,50},
    },
    # agent-execution.md — Agent workflow, preflight, dev/test skills
    "agent-execution.md": {
        "title": "Agent Execution Requirements",
        "scope": "Agent workflow entry points, preflight readiness checks, `/dev` and `/test` skill scaffolding and delegation.",
        "ids": {8,10,37,38,39,40,41},
    },
    # sessions.md — Session tree, retro, catchup
    "sessions.md": {
        "title": "Session and Retrospective Requirements",
        "scope": "Session tree structure, `/retro` retrospectives, `/catchup` orientation, and session-aware coaching.",
        "ids": {64,65,71,72,73,74,75,81},
    },
    # tech-debt.md — Tech debt, archive, staleness
    "tech-debt.md": {
        "title": "Tech Debt and Archive Requirements",
        "scope": "Tech-debt sweep, staleness surface, `/archive` for deprecated requirements, and cleanup workflows.",
        "ids": {79,80,82,87},
    },
    # docs-ux.md — Documentation quality, linking, domain terms
    "docs-ux.md": {
        "title": "Documentation and UX Requirements",
        "scope": "Documentation quality skills, clickable requirement links, stable anchors, domain term conventions, and VS Code UX commands.",
        "ids": {24,28,29,30,31,66,67,68,76,78},
    },
}

# Status emoji pattern
STATUS_RE = re.compile(r"\*\*Status:\*\*\s*(.*)")
STATUS_MAP = {
    "💡": "proposed",
    "🔧": "implemented",
    "✅": "verified",
    "⚠️": "attention",
    "⛔": "blocked",
    "🗑️": "deprecated",
}


def parse_requirements(text: str) -> list[tuple[int, str]]:
    """Split bundle.md into (id_number, block_text) pairs."""
    # Split on anchor tags: <a id="rqmd-ext-NNN"></a>
    anchor_re = re.compile(r"^(<a id=\"rqmd-ext-(\d+)\"></a>)$", re.MULTILINE)
    matches = list(anchor_re.finditer(text))
    
    blocks = []
    for i, m in enumerate(matches):
        start = m.start()
        end = matches[i + 1].start() if i + 1 < len(matches) else len(text)
        block = text[start:end].rstrip("\n") + "\n"
        id_num = int(m.group(2))
        blocks.append((id_num, block))
    
    return blocks


def count_statuses(blocks: list[tuple[int, str]]) -> str:
    """Build a summary line from requirement blocks."""
    counts = {"proposed": 0, "implemented": 0, "verified": 0, "attention": 0, "blocked": 0, "deprecated": 0}
    
    for _, block in blocks:
        m = STATUS_RE.search(block)
        if m:
            status_text = m.group(1)
            for emoji, key in STATUS_MAP.items():
                if emoji in status_text:
                    counts[key] += 1
                    break
            else:
                # Handle corrupted emoji (EXT-087 has broken emoji)
                if "Implemented" in status_text:
                    counts["implemented"] += 1
                elif "Proposed" in status_text:
                    counts["proposed"] += 1
    
    return (
        f"{counts['proposed']}💡 {counts['implemented']}🔧 {counts['verified']}✅ "
        f"{counts['attention']}⚠️ {counts['blocked']}⛔ {counts['deprecated']}🗑️"
    )


def write_domain_file(filename: str, meta: dict, blocks: list[tuple[int, str]]):
    """Write a domain file with header and requirement blocks."""
    # Sort blocks by ID number for clean ordering
    blocks.sort(key=lambda x: x[0])
    
    summary = count_statuses(blocks)
    
    lines = [
        f"# {meta['title']}\n",
        f"\n",
        f"Scope: {meta['scope']}\n",
        f"\n",
        f"<!-- acceptance-status-summary:start -->\n",
        f"Summary: {summary}\n",
        f"<!-- acceptance-status-summary:end -->\n",
        f"\n",
    ]
    
    for _, block in blocks:
        lines.append(block)
        lines.append("\n")
    
    path = REQS_DIR / filename
    path.write_text("".join(lines))
    print(f"  ✓ {filename}: {len(blocks)} reqs — {summary}")


def main():
    text = BUNDLE.read_text()
    all_blocks = parse_requirements(text)
    print(f"Parsed {len(all_blocks)} requirement blocks from bundle.md\n")
    
    # Build reverse map: id_num -> target file
    id_to_file = {}
    for filename, meta in CLUSTERS.items():
        for id_num in meta["ids"]:
            id_to_file[id_num] = filename
    
    # Check for unmapped IDs
    unmapped = [id_num for id_num, _ in all_blocks if id_num not in id_to_file]
    if unmapped:
        print(f"WARNING: unmapped IDs: {unmapped}")
        return
    
    # Check for mapped IDs not in file
    found_ids = {id_num for id_num, _ in all_blocks}
    for filename, meta in CLUSTERS.items():
        missing = meta["ids"] - found_ids
        if missing:
            print(f"WARNING: {filename} references IDs not in bundle.md: {missing}")
            return
    
    # Group blocks by target file
    file_blocks: dict[str, list[tuple[int, str]]] = {f: [] for f in CLUSTERS}
    for id_num, block in all_blocks:
        target = id_to_file[id_num]
        file_blocks[target].append((id_num, block))
    
    # Write files
    total = 0
    for filename, meta in CLUSTERS.items():
        blocks = file_blocks[filename]
        write_domain_file(filename, meta, blocks)
        total += len(blocks)
    
    print(f"\nTotal: {total} requirements across {len(CLUSTERS)} files")
    
    # Grand totals for sanity check
    all_sorted = sorted(all_blocks, key=lambda x: x[0])
    print(f"Grand summary: {count_statuses(all_sorted)}")


if __name__ == "__main__":
    main()
