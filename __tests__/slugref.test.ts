import {slugref, slugref_cs} from '../src/slug'

function test_slugref(input: string, expected: string) {
  let actual = slugref(input)
  expect(actual).toEqual(expected)
}

function test_slugref_cs(input: string, expected: string) {
  let actual = slugref_cs(input)
  expect(actual).toEqual(expected)
}

test('slug_ref:: master branch', () => {
  test_slugref('refs/heads/master', 'master')
  test_slugref_cs('refs/heads/master', 'master')
})

test('slug_ref: a feature branch', () => {
  test_slugref('refs/heads/feat/new_feature', 'feat-new_feature')
  test_slugref_cs('refs/heads/feat/new_feature', 'feat-new_feature')
})

test('slug_ref: a fix branch', () => {
  test_slugref('refs/heads/fix/issue_number', 'fix-issue_number')
  test_slugref_cs('refs/heads/fix/issue_number', 'fix-issue_number')
})

test('slug_ref: an underscore', () => {
  test_slugref('refs/heads/An_Underscore', 'an_underscore')
  test_slugref_cs('refs/heads/An_Underscore', 'An_Underscore')
})

test('slug_ref: a simple tag', () => {
  test_slugref('refs/tags/v1.0.0', 'v1.0.0')
  test_slugref_cs('refs/tags/v1.0.0', 'v1.0.0')
})

test('slug_ref: a complex tag', () => {
  test_slugref('refs/tags/product@1.0.0-rc.2', 'product-1.0.0-rc.2')
  test_slugref_cs('refs/tags/product@1.0.0-rc.2', 'product-1.0.0-rc.2')
})

test('slug_ref: a reference with upper case letters', () => {
  test_slugref('refs/heads/New_Awesome_Product', 'new_awesome_product')
  test_slugref_cs('refs/heads/New_Awesome_Product', 'New_Awesome_Product')
})

test('slug_ref: test trailing', () => {
  test_slugref('refs/heads/-trailing-feat-', 'trailing-feat')
  test_slugref_cs('refs/heads/-trailing-feat-', 'trailing-feat')
})

test('slug_ref: test refs inside string', () => {
  test_slugref('refs/heads/-refs/tags/feature/-', 'refs-tags-feature')
  test_slugref_cs('refs/heads/-refs/tags/feature/-', 'refs-tags-feature')
})

test('slug_ref: a very long name', () => {
  test_slugref(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
  test_slugref_cs(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-more'
  )
})

test('slug_ref: on pull-request ref', () => {
  test_slugref('refs/pull/branch', 'branch')
  test_slugref_cs('refs/pull/branch', 'branch')
})
