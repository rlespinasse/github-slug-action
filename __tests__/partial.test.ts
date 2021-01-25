import {sep} from 'path'
import {get_first_part, get_second_part} from '../src/partial'

function test_get_first_part(
  input: string,
  separator: string,
  expected: string
) {
  let actual = get_first_part(input, separator)
  expect(actual).toEqual(expected)
}

function test_get_second_part(
  input: string,
  separator: string,
  expected: string
) {
  let actual = get_second_part(input, separator)
  expect(actual).toEqual(expected)
}

test('get_first_part', () => {
  test_get_first_part('first/second', '/', 'first')
})

test('get_second_part', () => {
  test_get_second_part('first/second', '/', 'second')
})
