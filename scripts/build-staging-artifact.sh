#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT_DIR="$(cd "$SCRIPT_DIR/.." && pwd)"

# Required env: PLATFORM (ios|android), PROFILE (e.g., staging|production)
: "${PLATFORM:?PLATFORM env var is required}"
: "${PROFILE:?PROFILE env var is required}"

# Fetch the version from the root package.json and store it for reuse
PACKAGE_VERSION="$(node -pe "require('${ROOT_DIR}/package.json').version")"
APK_NAME="${PROFILE}-${PACKAGE_VERSION}.apk"

echo "Building ${PLATFORM} with profile ${PROFILE} (version ${PACKAGE_VERSION})"
eas build --platform "${PLATFORM}" --profile "${PROFILE}" --output "${PROFILE}-${PACKAGE_VERSION}.apk"


if [ -n "${GITHUB_OUTPUT:-}" ]; then
  echo "apk_name=${APK_NAME}" >> "$GITHUB_OUTPUT"
  echo "version=${PACKAGE_VERSION}" >> "$GITHUB_OUTPUT"
fi