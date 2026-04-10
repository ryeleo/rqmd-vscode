#!/usr/bin/env python3
"""Ensure release tag, package.json version, and stable changelog are synchronized."""
from __future__ import annotations

import argparse
import json
import os
import re
from pathlib import Path

TAG_PATTERN = re.compile(r"v?\d+\.\d+\.\d+(?:rc\d+)?")
RC_SUFFIX_PATTERN = re.compile(r"rc\d+$")


def parse_args() -> argparse.Namespace:
    parser = argparse.ArgumentParser(
        description="Ensure release tag, package.json version, and stable changelog are synchronized."
    )
    parser.add_argument(
        "tag",
        nargs="?",
        help="Release tag to ensure. Falls back to RELEASE_TAG when omitted.",
    )
    parser.add_argument(
        "--package-json",
        type=Path,
        default=Path("package.json"),
        help="Path to package.json.",
    )
    parser.add_argument(
        "--changelog",
        type=Path,
        default=Path("CHANGELOG.md"),
        help="Path to CHANGELOG.md to verify stable versioned entry exists.",
    )
    return parser.parse_args()


def resolve_tag(raw_tag: str | None) -> str:
    tag = (raw_tag or os.environ.get("RELEASE_TAG", "")).strip()
    if not tag:
        raise SystemExit("Release tag is required via argument or RELEASE_TAG environment variable")
    return tag


def tag_to_expected_version(tag: str) -> str:
    raw = tag.removeprefix("v")
    return RC_SUFFIX_PATTERN.sub("", raw)


def ensure_package_version(package_json_path: Path, expected_version: str) -> tuple[str, bool]:
    if not package_json_path.exists():
        raise SystemExit(f"package.json not found: {package_json_path}")

    data = json.loads(package_json_path.read_text(encoding="utf-8"))
    current = data.get("version")
    if not current:
        raise SystemExit(f"Could not find 'version' in {package_json_path}")

    if current == expected_version:
        return current, False

    data["version"] = expected_version
    package_json_path.write_text(json.dumps(data, indent=2) + "\n", encoding="utf-8")
    return current, True


def check_changelog_version(changelog_path: Path, version: str) -> None:
    if not changelog_path.exists():
        raise SystemExit(f"Changelog not found: {changelog_path}")
    text = changelog_path.read_text(encoding="utf-8")
    pattern = re.compile(r"^##\s+\[" + re.escape(version) + r"\]", re.MULTILINE)
    if not pattern.search(text):
        raise SystemExit(
            f"{changelog_path} does not contain a versioned entry for {version!r}.\n"
            f"Did you forget to roll [Unreleased] -> [{version}] before tagging?"
        )


def main() -> int:
    args = parse_args()
    tag = resolve_tag(args.tag)

    if not TAG_PATTERN.fullmatch(tag):
        raise SystemExit(
            f"Release tag {tag!r} must be a stable or rc semver tag like "
            f"v1.2.3, 1.2.3, v1.2.3rc1, or 1.2.3rc1"
        )

    expected_version = tag_to_expected_version(tag)
    previous_version, updated = ensure_package_version(args.package_json, expected_version)

    if updated:
        print(
            f"Updated {args.package_json}: version {previous_version!r} -> {expected_version!r}"
        )
    else:
        print(f"No change: {args.package_json} already has version {expected_version!r}")

    # Stable releases must already have a rolled changelog entry.
    if not RC_SUFFIX_PATTERN.search(tag):
        check_changelog_version(args.changelog, expected_version)
        print(f"Verified changelog entry exists for {expected_version!r} in {args.changelog}")

    print(f"OK: ensured release metadata for tag {tag!r}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
