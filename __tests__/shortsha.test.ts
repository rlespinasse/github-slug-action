import {shortsha} from '../src/short'

function test_short_sha(input: string, expected: string) {
  let actual = shortsha(input)
  expect(actual).toEqual(expected)
}

test('short_sha: long hash', () => {
  test_short_sha('a35a1a486a260cfd99c5b6f8c6034a2929ba9b3f', 'a35a1a48')
})
