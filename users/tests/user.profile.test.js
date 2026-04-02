import { test } from "node:test"
import assert from "node:assert"
import Build from "../app.js"

test('GET /profile', { skip: false }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'GET',
    url: '/profile',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTc3MzA2Mzc2MCwiZXhwIjozNzc3MzA2Mzc2MH0.iKktoZtPnwUkKF8g2kCwn4xhQdJ0w5EA4Vgjy8Byqu4'
    }
  })

  t.assert.strictEqual(res.statusCode, 200, 'profile should return code 200')
})

test('PUT /profile', { skip: true }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'PUT',
    url: '/profile',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOjMsInVzZXJuYW1lIjoidGVzdCIsImlhdCI6MTc3MzA2Mzc2MCwiZXhwIjozNzc3MzA2Mzc2MH0.iKktoZtPnwUkKF8g2kCwn4xhQdJ0w5EA4Vgjy8Byqu4'
    },
    payload: {
      user_phone: "33998604748",
      user_birth: "2008/11/27",
      user_name: "Juan Oliveira Fernandes"
    }
  })

  t.assert.strictEqual(res.statusCode, 201, 'profile should return code 201')
})

test('DELETE /profile', { skip: true }, async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'DELETE',
    url: '/profile',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjozNywiaWF0IjoxNzc0MjczNzIyLCJleHAiOjM3Nzc0MjczNzIyfQ.i2Y6vPE5U_vADBiZQJUASMKdilQtZwWqDxzeCHgu3lM'
    }
  })

  t.assert.strictEqual(res.statusCode, 200, 'profile should return code 200')
})
