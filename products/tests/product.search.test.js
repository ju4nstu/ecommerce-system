import { test, describe, beforeEach } from 'node:test'
import assert from 'node:assert/strict'
import Build from '../app.js'

describe('product tests', () => {
  let server
  
  beforeEach(t => {
    server = Build()
    t.after(() => server.close())
  })
  
  test('search', async t => {
    const res = await server.inject({
      method: 'GET',
      url: '/search/ryzen',
    })
    //console.log(res.body)
    t.assert.strictEqual(res.statusCode, 200)
  })
  
  test('product detail', async t => {
    const res = await server.inject({
      method: 'GET',
      url: '/product/2'
    })
  
    t.assert.strictEqual(res.statusCode, 200)
  })
  
  describe('req queries', () => {
    test('page_number input bigger than its possible', async t => {
      const res = await server.inject({
        method: 'GET',
        url: '/?page_number=55457'
      })
  
      t.assert.strictEqual(res.statusCode, 404, 'should return 404: NOT FOUND')
    })
    describe('sort options', () => {
      test('price', async t => {
        const res = await server.inject({
          method: 'GET',
          url: '/?sort=price'
        })
    
        t.assert.strictEqual(res.statusCode, 200, 'should return 200: OK')
      })
      
      test('-price', async t => {
        const res = await server.inject({
          method: 'GET',
          url: '/?sort=-price'
        })
    
        t.assert.strictEqual(res.statusCode, 200, 'should return 200: OK')
      })

      test('nonexistent', async t => {
        const res = await server.inject({
          method: 'GET',
          url: '/?sort=hello'
        })
    
        t.assert.strictEqual(res.statusCode, 200, 'should return 200: OK')
      })
    })
  })
})

