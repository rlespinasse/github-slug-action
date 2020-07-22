#!/bin/sh -l

slug() {
  echo "$1" |
    tr "[:upper:]" "[:lower:]" |
    sed -r 's/[~\^]+//g;s/[^a-zA-Z0-9.]+/-/g;s/^-+\|-+$//g;s/^-*//;s/-*$//' |
    cut -c1-63
}

slug_url() {
  echo "$1" |
    tr "[:upper:]" "[:lower:]" |
    sed -r 's/[~\^]+//g;s/[^a-zA-Z0-9]+/-/g;s/^-+\|-+$//g;s/^-*//;s/-*$//' |
    cut -c1-63
}

slug_ref() {
  echo "$1" |
    tr "[:upper:]" "[:lower:]" |
    sed -r 's#refs/[^\/]*/##;s/[~\^]+//g;s/[^a-zA-Z0-9.]+/-/g;s/^-+\|-+$//g;s/^-*//;s/-*$//' |
    cut -c1-63
}

slug_url_ref() {
  echo "$1" |
    tr "[:upper:]" "[:lower:]" |
    sed -r 's#refs/[^\/]*/##;s/[~\^]+//g;s/[^a-zA-Z0-9]+/-/g;s/^-+\|-+$//g;s/^-*//;s/-*$//' |
    cut -c1-63
}

short_sha() {
  echo "$1" |
    cut -c1-8
}

get_event_keyvalue() {
  if [ -f "$GITHUB_EVENT_PATH" ]; then
    jq -r ".$1" "$GITHUB_EVENT_PATH" | grep -v "null"
  fi
}

echo ::set-env name=GITHUB_REPOSITORY_SLUG::"$(slug "$GITHUB_REPOSITORY")"
echo ::set-env name=GITHUB_REPOSITORY_SLUG_URL::"$(slug_url "$GITHUB_REPOSITORY")"

echo ::set-env name=GITHUB_REF_SLUG::"$(slug_ref "$GITHUB_REF")"
echo ::set-env name=GITHUB_HEAD_REF_SLUG::"$(slug_ref "$GITHUB_HEAD_REF")"
echo ::set-env name=GITHUB_BASE_REF_SLUG::"$(slug_ref "$GITHUB_BASE_REF")"
echo ::set-env name=GITHUB_EVENT_REF_SLUG::"$(slug_ref "$(get_event_keyvalue "ref")")"

echo ::set-env name=GITHUB_REF_SLUG_URL::"$(slug_url_ref "$GITHUB_REF")"
echo ::set-env name=GITHUB_HEAD_REF_SLUG_URL::"$(slug_url_ref "$GITHUB_HEAD_REF")"
echo ::set-env name=GITHUB_BASE_REF_SLUG_URL::"$(slug_url_ref "$GITHUB_BASE_REF")"
echo ::set-env name=GITHUB_EVENT_REF_SLUG_URL::"$(slug_url_ref "$(get_event_keyvalue "ref")")"

echo ::set-env name=GITHUB_SHA_SHORT::"$(short_sha "$GITHUB_SHA")"
