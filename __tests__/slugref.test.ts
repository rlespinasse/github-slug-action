import {slugref} from '../src/slug'

function test_slug_ref(input: string, expected: string) {
  let actual = slugref(input)
  expect(actual).toEqual(expected)
}

test('slug_ref:: master branch', () => {
  test_slug_ref('refs/heads/master', 'master')
})

test('slug_ref: a feature branch', () => {
  test_slug_ref('refs/heads/feat/new_feature', 'feat-new-feature')
})

test('slug_ref: a fix branch', () => {
  test_slug_ref('refs/heads/fix/issue_number', 'fix-issue-number')
})

test('slug_ref: a simple tag', () => {
  test_slug_ref('refs/tags/v1.0.0', 'v1.0.0')
})

test('slug_ref: a complex tag', () => {
  test_slug_ref('refs/tags/product@1.0.0-rc.2', 'product-1.0.0-rc.2')
})

test('slug_ref: a reference with upper case letters', () => {
  test_slug_ref('refs/heads/New_Awesome_Product', 'new-awesome-product')
})

test('slug_ref: test trailing', () => {
  test_slug_ref('refs/heads/-trailing-feat-', 'trailing-feat')
})

test('slug_ref: test refs inside string', () => {
  test_slug_ref('refs/heads/-refs/tags/feature/-', 'refs-tags-feature')
})

test('slug_ref: a very long name', () => {
  test_slug_ref(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
})
