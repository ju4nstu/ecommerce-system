import { test } from "node:test"
import assert from "node:assert"
import { checkAge } from "../services/checkAge.service.js"

test('check age: adult', { skip: false }, async t => {
  const res = checkAge('2000/11/27')
  t.assert.strictEqual(res, true, 'should return true')
})

test('check age: not adult', { skip: false }, async t => {
  const res = checkAge('2010/11/27')
  t.assert.strictEqual(res, false, 'should return false')
})