import {slugref} from '../src/slug'

function test_slug(input: string, expected: string) {
  let actual = slugref(input)
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

test('slug: a very long string', () => {
  test_slug(
    'an-awesome-Feature-Very-Very-Very-Very-Very-Very-Very-Long-moreThan63Characters',
    'an-awesome-feature-very-very-very-very-very-very-very-long-more'
  )
})
