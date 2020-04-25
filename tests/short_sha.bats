#!/usr/bin/env bats

@test "Short long hash" {
  test_short_sha \
    "a35a1a486a260cfd99c5b6f8c6034a2929ba9b3f" \
    "a35a1a48"
}

# Load sluf_ref function
source entrypoint.sh > /dev/null 2>&1

test_short_sha(){
  given="${1}"
  expected="${2}"

  actual="$(short_sha ${given})"
  echo "expected : [${expected}], actual : [${actual}]"
  [ "${actual}" == "${expected}" ]
}
