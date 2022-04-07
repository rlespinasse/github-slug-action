import {slug, slug_cs} from '../src/slug'

function test_slug(input: string, expected: string) {
  let actual = slug(input)
  expect(actual).toEqual(expected)
}

function test_slug_cs(input: string, expected: string) {
  let actual = slug_cs(input)
  expect(actual).toEqual(expected)
}

test('slug: a word', () => {
  test_slug('word', 'word')
  test_slug_cs('word', 'word')
})

test('slug: a string', () => {
  test_slug('basic-string', 'basic-string')
  test_slug_cs('basic-string', 'basic-string')
})

test('slug: a string in camel case', () => {
  test_slug('camelCase', 'camelcase')
  test_slug_cs('camelCase', 'camelCase')
})

test('slug: a path', () => {
  test_slug('path/to/something', 'path-to-something')
  test_slug_cs('path/to/something', 'path-to-something')
})

test('slug: a number', () => {
  test_slug('4.2', '4.2')
  test_slug_cs('4.2', '4.2')
})

test('slug: an underscore', () => {
  test_slug('An_Underscore', 'an_underscore')
  test_slug_cs('An_Underscore', 'An_Underscore')
})

test('slug: special character', () => {
  test_slug('feat-(!è§-character', 'feat------character')
  test_slug_cs('feat-(!è§-character', 'feat------character')
})

test('slug: trailing', () => {
  test_slug('-feat-trailing-', 'feat-trailing')
  test_slug_cs('-feat-trailing-', 'feat-trailing')
})

test('slug: a very long string', () => {
  test_slug(
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
  test_slug_cs(
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-more'
  )
})

test('slug: short string after trailing', () => {
  test_slug(
    '-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters-',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
  test_slug_cs(
    '-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters-',
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-more'
  )
})
