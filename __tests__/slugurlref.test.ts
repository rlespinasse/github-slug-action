import {slugurlref} from '../src/slug'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

function test_slug_url_ref(input: string, expected: string) {
  var actual = slugurlref(input)
  expect(actual).toEqual(expected)
}

test('slug_url_ref: master branch', () => {
  test_slug_url_ref('refs/heads/master', 'master')
})

test('slug_url_ref: a feature branch', () => {
  test_slug_url_ref('refs/heads/feat/new_feature', 'feat-new-feature')
})

test('slug_url_ref: a fix branch', () => {
  test_slug_url_ref('refs/heads/fix/issue_number', 'fix-issue-number')
})

test('slug_url_ref: a simple tag', () => {
  test_slug_url_ref('refs/tags/v1.0.0', 'v1-0-0')
})

test('slug_url_ref: a complex tag', () => {
  test_slug_url_ref('refs/tags/product@1.0.0-rc.2', 'product-1-0-0-rc-2')
})

test('slug_url_ref: a reference with upper case letters', () => {
  test_slug_url_ref('refs/heads/New_Awesome_Product', 'new-awesome-product')
})

test('slug_url_ref: a very long name', () => {
  test_slug_url_ref(
    'refs/heads/an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
})
