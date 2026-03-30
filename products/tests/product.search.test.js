import test from 'node:test'
import assert from 'node:assert'
import Build from '../app.js'

test('search mechanism', async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'GET',
    url: '/search/i9',
  })
  t.assert.strictEqual(res.statusCode, 200)
})

test('product details', async t => {
  t.plan(1)
  const server = Build()

  t.after(() => server.close())

  const res = await server.inject({
    method: 'GET',
    url: '/product/2'
  })

  console.log(res.body)
  t.assert.strictEqual(res.statusCode, 200)
})