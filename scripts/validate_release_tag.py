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


def main() -> int:
    args = parse_args()
    tag = resolve_tag(args.tag)

    if not TAG_PATTERN.fullmatch(tag):
        raise SystemExit(
            f"Release tag {tag!r} must be a stable or rc semver tag like "
            f"v1.2.3, 1.2.3, v1.2.3rc1, or 1.2.3rc1"
        )

    version = load_package_version(args.package_json)
    if tag.removeprefix("v") != version:
        raise SystemExit(
            f"Release tag {tag!r} does not match version {version!r} "
            f"in {args.package_json}"
        )

    print(f"OK: tag {tag!r} matches package.json version {version!r}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
