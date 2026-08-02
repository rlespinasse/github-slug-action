#!/usr/bin/env bash

# Consolidates the 9 previous `rlespinasse/slugify-value` composite action calls
# into a single shell step, to avoid the "env:" dump printed by the runner's
# log renderer for every shell run step (see issue #161). This script
# reimplements slugify-value's slug/slug-cs/slug-url/slug-url-cs/reduce logic
# verbatim and writes the same GITHUB_ENV lines as before, for each key.

if [[ "$OSTYPE" == "darwin"* ]]; then
  # On MacOS,
  # bash don't support substitution, so we use 'tr'
  upper() { tr '[:lower:]' '[:upper:]' <<<"$1"; }
  lower() { tr '[:upper:]' '[:lower:]' <<<"$1"; }
else
  upper() { local s="$1"; echo "${s^^}"; }
  lower() { local s="$1"; echo "${s,,}"; }
fi

PREFIX=$(upper "$INPUT_PREFIX")

MAX_LENGTH=""
if [ -z "${INPUT_SLUG_MAXLENGTH}" ]; then
  echo "::error ::slug-maxlength cannot be empty"
  exit 1
elif [ "${INPUT_SLUG_MAXLENGTH}" -eq "${INPUT_SLUG_MAXLENGTH}" ] 2>/dev/null; then
  MAX_LENGTH="${INPUT_SLUG_MAXLENGTH}"
elif [ "${INPUT_SLUG_MAXLENGTH}" == "nolimit" ]; then
  MAX_LENGTH="${INPUT_SLUG_MAXLENGTH}"
else
  echo "::error ::slug-maxlength must be a number or equals to 'nolimit'"
  exit 1
fi

slug() {
  # 1st : Remove refs prefix
  # 2d : Replace unwanted characters
  # 3d : Remove leading hypens
  output=$(sed -E 's#refs/[^\/]*/##;s/[^a-zA-Z0-9._-]+/-/g;s/^-*//' <<<"$1")
  reduce "$output"
}

slug_url() {
  # 1st : Remove refs prefix
  # 2d : Replace unwanted characters
  # 3d : Remove leading hypens
  output=$(sed -E 's#refs/[^\/]*/##;s/[^a-zA-Z0-9-]+/-/g;s/^-*//' <<<"$1")
  reduce "$output"
}

reduce() {
  reduced_value="$1"
  if [ "${MAX_LENGTH}" != "nolimit" ]; then
    reduced_value=$(cut -c1-"${MAX_LENGTH}" <<<"$reduced_value")
  fi
  # 1st : Remove trailing hypens
  sed -E 's/-*$//' <<<"$reduced_value"
}

# Owner/name parts, computed inline (replaces the two helper `id:` steps' outputs)
GITHUB_REPOSITORY_OWNER_PART_VALUE=$(cut -d/ -f1 <<<"$INPUT_GITHUB_REPOSITORY")
GITHUB_REPOSITORY_NAME_PART_VALUE=$(cut -d/ -f2 <<<"$INPUT_GITHUB_REPOSITORY")

process() {
  local key="$1"
  local value="$2"
  local cs_value="${value:-${!key}}"
  local upper_key
  upper_key=$(upper "$key")
  local val
  val=$(lower "$cs_value")
  local slug_v slug_cs slug_url_v slug_url_cs
  slug_v=$(slug "$val")
  slug_cs=$(slug "$cs_value")
  slug_url_v=$(slug_url "$val")
  slug_url_cs=$(slug_url "$cs_value")
  {
    echo "${PREFIX}${upper_key}=${cs_value}"
    echo "${PREFIX}${upper_key}_SLUG=${slug_v}"
    echo "${PREFIX}${upper_key}_SLUG_CS=${slug_cs}"
    echo "${PREFIX}${upper_key}_SLUG_URL=${slug_url_v}"
    echo "${PREFIX}${upper_key}_SLUG_URL_CS=${slug_url_cs}"
  } >>"$GITHUB_ENV"
}

# From Environment Variables
process GITHUB_REPOSITORY "$INPUT_GITHUB_REPOSITORY"
process GITHUB_REF ""
process GITHUB_HEAD_REF ""
process GITHUB_BASE_REF ""

# From Specific values
process GITHUB_EVENT_REF "$INPUT_GITHUB_EVENT_REF"
process GITHUB_REF_NAME "$INPUT_GITHUB_REF_NAME"
process GITHUB_REF_POINT "${GITHUB_HEAD_REF:-$INPUT_GITHUB_REF_NAME}"

# From Calculated values
process GITHUB_REPOSITORY_OWNER_PART "$GITHUB_REPOSITORY_OWNER_PART_VALUE"
process GITHUB_REPOSITORY_NAME_PART "$GITHUB_REPOSITORY_NAME_PART_VALUE"
