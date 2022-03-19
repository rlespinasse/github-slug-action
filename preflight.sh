#!/usr/bin/env bash

if [ -z "${INPUT_SLUG_MAXLENGTH}" ]; then
  echo "::error ::slug-maxlength cannot be empty"
  exit 1
elif [ "${INPUT_SLUG_MAXLENGTH}" != "nolimit" ] && [ ! "${INPUT_SLUG_MAXLENGTH}" -eq "${INPUT_SLUG_MAXLENGTH}" ] 2>/dev/null; then
  echo "::error ::slug-maxlength must be a number or equals to 'nolimit'"
  exit 1
fi
