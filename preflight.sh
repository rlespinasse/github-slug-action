#!/usr/bin/env bash

if [ -z "${INPUT_SLUG_MAXLENGTH}" ]; then
  echo "::error ::slug-maxlength cannot be empty"
  exit 1
elif [ "${INPUT_SLUG_MAXLENGTH}" != "nolimit" ] && [ ! "${INPUT_SLUG_MAXLENGTH}" -eq "${INPUT_SLUG_MAXLENGTH}" ] 2>/dev/null; then
  echo "::error ::slug-maxlength must be a number or equals to 'nolimit'"
  exit 1
fi

if [ ! "${INPUT_SHORT_LENGTH}" -eq "${INPUT_SHORT_LENGTH}" ] 2>/dev/null; then
  echo "::error ::short-length must be a number"
  exit 1
fi

echo "::debug ::Control preflight short-length setup"
PREFLIGHT_SHORT_LENGTH=""
if [ -n "${INPUT_SHORT_LENGTH}" ]; then
  PREFLIGHT_SHORT_LENGTH="${INPUT_SHORT_LENGTH}"
  echo "::debug ::Use input value: $PREFLIGHT_SHORT_LENGTH"
elif [ "$(git rev-parse --is-inside-work-tree)" == "true" ]; then
  echo "::debug ::The action run inside a git repository, short-length can be empty"
else
  echo "::debug ::The action run outside a git repository, need to set short-length"
  PREFLIGHT_SHORT_LENGTH="$(git config --get core.abbrev)"
  if [ -n "${PREFLIGHT_SHORT_LENGTH}" ]; then
    echo "::debug ::Git Configuration 'core.abbrev' is set, using it as short-length"
  else
    PREFLIGHT_SHORT_LENGTH="7"
    echo "::debug ::Using fallback value for short-length"
  fi
fi
echo "::debug ::Set PREFLIGHT_SHORT_LENGTH=$PREFLIGHT_SHORT_LENGTH"
if [ -f "$GITHUB_OUTPUT" ]; then
  echo "PREFLIGHT_SHORT_LENGTH=${PREFLIGHT_SHORT_LENGTH}" >> "$GITHUB_OUTPUT"
else
  echo "::set-output name=PREFLIGHT_SHORT_LENGTH::${PREFLIGHT_SHORT_LENGTH}"
fi
