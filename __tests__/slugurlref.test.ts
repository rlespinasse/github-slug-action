import {slugurlref, slugurlref_cs} from '../src/slug'

function test_slugurlref(input: string, expected: string) {
  let actual = slugurlref(input)
  expect(actual).toEqual(expected)
}

function test_slugurlref_cs(input: string, expected: string) {
  let actual = slugurlref_cs(input)
  expect(actual).toEqual(expected)
}

test('slug_url_ref: master branch', () => {
  test_slugurlref('refs/heads/master', 'master')
  test_slugurlref_cs('refs/heads/master', 'master')
})

test('slug_url_ref: a feature branch', () => {
  test_slugurlref('refs/heads/feat/new_feature', 'feat-new-feature')
  test_slugurlref_cs('refs/heads/feat/new_feature', 'feat-new-feature')
})

test('slug_url_ref: a fix branch', () => {
  test_slugurlref('refs/heads/fix/issue_number', 'fix-issue-number')
  test_slugurlref_cs('refs/heads/fix/issue_number', 'fix-issue-number')
})

test('slug_url_ref: a simple tag', () => {
  test_slugurlref('refs/tags/v1.0.0', 'v1-0-0')
  test_slugurlref_cs('refs/tags/v1.0.0', 'v1-0-0')
})

test('slug_url_ref: a complex tag', () => {
  test_slugurlref('refs/tags/product@1.0.0-rc.2', 'product-1-0-0-rc-2')
  test_slugurlref_cs('refs/tags/product@1.0.0-rc.2', 'product-1-0-0-rc-2')
})

test('slug_url_ref: a reference with upper case letters', () => {
  test_slugurlref('refs/heads/New_Awesome_Product', 'new-awesome-product')
  test_slugurlref_cs('refs/heads/New_Awesome_Product', 'New-Awesome-Product')
})

test('slug_url_ref: a very long name', () => {
  test_slugurlref(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
  test_slugurlref_cs(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-more'
  )
})

test('slug_url_ref: test trailing', () => {
  test_slugurlref('refs/heads/-an-awesome-Feature-', 'an-awesome-feature')
  test_slugurlref_cs('refs/heads/-an-awesome-Feature-', 'an-awesome-Feature')
})

test('slug_url_ref: test trailing with dot', () => {
  test_slugurlref('refs/heads/.an-awesome-Feature.', 'an-awesome-feature')
  test_slugurlref_cs('refs/heads/.an-awesome-Feature.', 'an-awesome-Feature')
})

test('slug_url_ref: on pull-request ref', () => {
  test_slugurlref('refs/pull/branch', 'branch')
  test_slugurlref_cs('refs/pull/branch', 'branch')
})
