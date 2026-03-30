import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import Build from '../app.js'

describe('product tests', () => {
  let server
  
  beforeEach(t => {
    server = Build()
    t.after(() => server.close())
  })
  
  test('search mechanism', async t => {
    const res = await server.inject({
      method: 'GET',
      url: '/search/i9',
    })
    t.assert.strictEqual(res.statusCode, 200)
  })
  
  test('product details', async t => {
    const res = await server.inject({
      method: 'GET',
      url: '/product/2'
    })
    
    //console.log(res.body)
    t.assert.strictEqual(res.statusCode, 200)
  })
})
