import { beforeEach, describe, it } from 'node:test'
import assert from 'node:assert/strict'
import Build from '../app.js'

describe('CRUD Cart', () => {
  let server
  
  beforeEach(t => {
    server = Build()

    t.after(() => server.close())
  })
  
  it('Create Cart/Add First Item', { skip: true }, async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/cart',
      payload: {
        user_id: 3,
        product_id: 15,
        quantity: 1
      }
    })
    assert.strictEqual(res.statusCode, 201, "should've returned code 201")
  })

  it('Update Product Quantity', async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/cart',
      payload: { // user_id, product_id, quantity
        user_id: 3,
        product_id: 15,
        quantity: 2
      }
    })
    assert.strictEqual(res.statusCode, 200, "should've returned code 200")
  })
})