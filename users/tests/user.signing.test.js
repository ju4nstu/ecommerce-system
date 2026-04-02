import { test } from "node:test"
import assert from "node:assert"
import Build from "../app.js"
import { genString, genInt } from "../services/randomString.js"

test('/signup passes correct schema', { skip: false }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'POST',
    url: '/signup',
    payload: {
      name: `test${genInt(9, 3)}`,
      email: `${genString(4)}@gmail.com`,
      password: 'juantestlengthpass',
      phone: "33998754609",
      birthday: "2000/05/03",
    }
  })
  t.assert.strictEqual(res.statusCode, 201, 'sign up should return 201')
})

test('/signup passes blocks invalid schema', { skip: false }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'POST',
    url: '/signup',
    payload: {
      name: 'test3',
      email: 'foosw122@gmail.com',
      password: '123',
    }
  })
  t.assert.strictEqual(res.statusCode, 400, 'sign up should return 400')
})

test('/signin passes schema', { skip: false }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'POST',
    url: '/signin',
    payload: {
      email: 'test1@gmail.com',
      password: 'test123'
    }
  })

  t.assert.strictEqual(res.statusCode, 200, 'sign in should return 200')
})

test('/signin blocks invalid schema', { skip: false }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'POST',
    url: '/signin',
    payload: {
      emails: 'test1@gmail.com',
      password: 'test123'
    }
  })

  t.assert.strictEqual(res.statusCode, 400, 'sign in should return 400')
})
