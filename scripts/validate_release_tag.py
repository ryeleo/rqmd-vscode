#!/usr/bin/env python3
"""Validate that a release tag matches the version in package.json.

Mirrors the style of rqmd-cli/scripts/validate_release_tag.py so both
projects can be validated with the same conventions in CI.
"""
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
        description="Validate that a release tag matches version in package.json."
    )
    parser.add_argument(
        "tag",
        nargs="?",
        help="Release tag to validate. Falls back to RELEASE_TAG when omitted.",
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
        help="Path to CHANGELOG.md to verify versioned entry exists.",
    )
    return parser.parse_args()


def resolve_tag(raw_tag: str | None) -> str:
    tag = (raw_tag or os.environ.get("RELEASE_TAG", "")).strip()
    if not tag:
        raise SystemExit(
            "Release tag is required via argument or RELEASE_TAG environment variable"
        )
    return tag


def load_package_version(package_json_path: Path) -> str:
    data = json.loads(package_json_path.read_text(encoding="utf-8"))
    version = data.get("version")
    if not version:
        raise SystemExit(f"Could not find 'version' in {package_json_path}")
    return version


def check_changelog_version(changelog_path: Path, version: str) -> None:
    """Assert CHANGELOG.md has a versioned section header for *version*."""
    if not changelog_path.exists():
        raise SystemExit(f"Changelog not found: {changelog_path}")
    text = changelog_path.read_text(encoding="utf-8")
    pattern = re.compile(r"^##\s+\[" + re.escape(version) + r"\]", re.MULTILINE)
    if not pattern.search(text):
        raise SystemExit(
            f"{changelog_path} does not contain a versioned entry for {version!r}.\n"
            f"Did you forget to roll [Unreleased] → [{version}] before tagging?"
        )


def tag_to_expected_version(tag: str) -> str:
    """Map release tags to the package.json version expectation.

    VS Code extension versions must be plain semver (x.y.z). We still allow
    rc release tags like v0.2.1rc1 and treat them as pre-release publishes for
    the base extension version 0.2.1.
    """
    raw = tag.removeprefix("v")
    return RC_SUFFIX_PATTERN.sub("", raw)


def main() -> int:
    args = parse_args()
    tag = resolve_tag(args.tag)

    if not TAG_PATTERN.fullmatch(tag):
        raise SystemExit(
            f"Release tag {tag!r} must be a stable or rc semver tag like "
            f"v1.2.3, 1.2.3, v1.2.3rc1, or 1.2.3rc1"
        )

    version = load_package_version(args.package_json)
    expected_version = tag_to_expected_version(tag)
    if expected_version != version:
        raise SystemExit(
            f"Release tag {tag!r} expects version {expected_version!r}, "
            f"but found {version!r} "
            f"in {args.package_json}"
        )

    # Changelog check only applies to stable releases — rc tags precede the roll.
    if not RC_SUFFIX_PATTERN.search(tag):
        check_changelog_version(args.changelog, expected_version)

    print(
        f"OK: tag {tag!r} maps to package.json version {version!r}"
    )
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
