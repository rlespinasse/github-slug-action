import {slug} from '../src/slug'

function test_slug(input: string, expected: string) {
  let actual = slug(input)
  expect(actual).toEqual(expected)
}

test('slug: a word', () => {
  test_slug('word', 'word')
})

test('slug: a string', () => {
  test_slug('basic-string', 'basic-string')
})

test('slug: a string in camel case', () => {
  test_slug('camelCase', 'camelcase')
})

test('slug: a path', () => {
  test_slug('path/to/something', 'path-to-something')
})

test('slug: a number', () => {
  test_slug('4.2', '4.2')
})

test('slug: special caracter', () => {
  test_slug('feat-(!è§-caracter', 'feat------caracter')
})

test('slug: trailing', () => {
  test_slug('-feat-trailing-', 'feat-trailing')
})

test('slug: a very long string', () => {
  test_slug(
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
})

test('slug: short string after trailing', () => {
  test_slug(
    '-an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters-',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
})
