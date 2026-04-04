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
      url: '/cart/create',
      payload: {
        user_id: 1,
        product_id: 10,
        quantity: 1
      }
    })

    assert.strictEqual(res.statusCode, 201, "should've returned code 201")
  })
  
  it('Read cart', { skip: true }, async () => {
    const res = await server.inject({
      method: 'GET',
      url: '/cart/3'
    })
    assert.strictEqual(res.statusCode, 200, "should've returned code 200")
  })

  it('Update Product Quantity', { skip: true }, async () => {
    const res = await server.inject({
      method: 'PUT',
      url: '/cart/update',
      payload: { // user_id, product_id, quantity
        user_id: 3,
        product_id: 16,
        quantity: 2
      }
    })
    assert.strictEqual(res.statusCode, 200, "should've returned code 200")
  })
  
  it('Add New Product to Cart', { skip: true }, async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/cart/add',
      payload: { // user_id, product_id, quantity
        user_id: 3,
        product_id: 20,
        quantity: 1
      }
    })
    assert.strictEqual(res.statusCode, 201, "should've returned code 201")
  })
  
  it('Remove from cart', { skip: true }, async () => {
    const res = await server.inject({
      method: 'DELETE',
      url: '/cart/17/3'
    })
    assert.strictEqual(res.statusCode, 200, "should've returned code 200")
  })

  it('Create a new cart while another one already exists returns 401', { skip: true }, async () => {
    const res = await server.inject({
      method: 'POST',
      url: '/cart/create',
      payload: { // user_id, product_id, quantity
        user_id: 3,
        product_id: 16,
        quantity: 1
      }
    })
    assert.strictEqual(res.statusCode, 401, "should've returned code 401")
  })
})