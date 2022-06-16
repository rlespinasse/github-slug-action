import {slugurl, slugurl_cs} from '../src/slug'

function test_slugurl(input: string, expected: string) {
  let actual = slugurl(input)
  expect(actual).toEqual(expected)
}

function test_slugurl_cs(input: string, expected: string) {
  let actual = slugurl_cs(input)
  expect(actual).toEqual(expected)
}

test('slug_url: a word', () => {
  test_slugurl('word', 'word')
  test_slugurl_cs('word', 'word')
})

test('slug_url: a string', () => {
  test_slugurl('basic-string', 'basic-string')
  test_slugurl_cs('basic-string', 'basic-string')
})

test('slug_url: a string in camel case', () => {
  test_slugurl('camelCase', 'camelcase')
  test_slugurl_cs('camelCase', 'camelCase')
})

test('slug_url: a path', () => {
  test_slugurl('path/to/something', 'path-to-something')
  test_slugurl_cs('path/to/something', 'path-to-something')
})

test('slug_url: a number', () => {
  test_slugurl('4.2', '4-2')
  test_slugurl_cs('4.2', '4-2')
})

test('slug_url: an underscore', () => {
  test_slugurl('An_Underscore', 'an-underscore')
  test_slugurl_cs('An_Underscore', 'An-Underscore')
})

test('slug_url: trailing', () => {
  test_slugurl('.path.to.', 'path-to')
  test_slugurl_cs('.path.to.', 'path-to')
})

test('slug_url: a very long string', () => {
  test_slugurl(
    'has-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'has-an-awesome-feature-very-very-very-very-very-very-very-long'
  )
  test_slugurl_cs(
    'has-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'has-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long'
  )
})
