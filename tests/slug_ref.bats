#!/usr/bin/env bats

@test "Slug master branch" {
  test_sluf_ref \
    "refs/heads/master" \
    "master"
}

@test "Slug a feature branch" {
  test_sluf_ref \
    "refs/heads/feat/new_feature" \
    "feat-new-feature"
}

@test "Slug a fix branch" {
  test_sluf_ref \
    "refs/heads/fix/issue_number" \
    "fix-issue-number"
}

@test "Slug a simple tag" {
  test_sluf_ref \
    "refs/tags/v1.0.0" \
    "v1.0.0"
}

@test "Slug a complex tag" {
  test_sluf_ref \
    "refs/tags/product@1.0.0-rc.2" \
    "product-1.0.0-rc.2"
}

@test "Slug a reference with upper case letters" {
  test_sluf_ref \
    "refs/heads/New_Awesome_Product" \
    "new-awesome-product"
}

@test "Slug a very long name" {
  test_sluf_ref \
    "refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters" \
    "an-awesome-feature-very-very-very-very-very-very-very-long-more"
}

# Load sluf_ref function
source entrypoint.sh > /dev/null 2>&1

test_sluf_ref() {
  given="${1}"
  expected="${2}"

  actual="$(slug_ref \"${given}\")"
  echo "expected : [${expected}], actual : [${actual}]"
  [ "${actual}" == "${expected}" ]
}
