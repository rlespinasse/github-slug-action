#!/usr/bin/env bats

@test "slug_ref" {
  source entrypoint.sh

  i=0
  j=0

  given[++i]="refs/head/master"
  expected[++j]="master"

  given[++i]="refs/head/feat/newFeature"
  expected[++j]="newfeature"

  given[++i]="refs/tags/v1.0"
  expected[++j]="v1-0"

  given[++i]="refs/head/awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters"
  expected[++j]="awesome-feature-very-very-very-very-very-very-very-long-moretha"

  for i in "${!given[@]}"
  do
    actual="$(slug_ref \"${given[i]}\")"
    echo "expected : [${expected[i]}], actual : [${actual}]"
    [ "$actual" == "${expected[i]}" ]
  done
}
