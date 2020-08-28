import {shortsha} from '../src/slug'
import * as process from 'process'
import * as cp from 'child_process'
import * as path from 'path'

function test_short_sha(input: string, expected: string) {
  var actual = shortsha(input)
  expect(actual).toEqual(expected)
}

test('short_sha: long hash', () => {
  test_short_sha('a35a1a486a260cfd99c5b6f8c6034a2929ba9b3f', 'a35a1a48')
})
