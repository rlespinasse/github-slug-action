#!/usr/bin/env bats

@test "slug_url: a word" {
  test_slug_url \
    "word" \
    "word"
}

@test "slug_url: a string" {
  test_slug_url \
    "basic-string" \
    "basic-string"
}

@test "slug_url: a string in camel case" {
  test_slug_url \
    "camelCase" \
    "camelcase"
}

@test "slug_url: a path" {
  test_slug_url \
    "path/to/something" \
    "path-to-something"
}

@test "slug_url: a number" {
  test_slug_url \
    "4.2" \
    "4-2"
}

@test "slug_url: a very long string" {
  test_slug_url \
    "an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters" \
    "an-awesome-feature-very-very-very-very-very-very-very-long-more"
}

# Load sluf_ref function
source entrypoint.sh > /dev/null 2>&1

test_slug_url() {
  given="${1}"
  expected="${2}"

  actual="$(slug_url \"${given}\")"
  echo "expected : [${expected}], actual : [${actual}]"
  [ "${actual}" == "${expected}" ]
}
