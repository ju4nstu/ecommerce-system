// place order -> after going through precart 
// orders:
// id, user_id, status, total_amount, created_at, updated_at

// order_items:
// id, order_id, product_id, product_name, quantity, unit_price

// order_status_history:
// id, order_id, status, note, updated_at

// transaction
// 1. insert into orders
// 2. insert into order_items
// 3. insert into order_status_history

import db from '../config/db.js'

export async function PlaceOrder(req, rep) {
  const {
    user_id,
    total_amount,
    product_id,
    product_name,
    quantity,
    unit_price,
    note
  } = req.body

  await db.transaction(function (trx) {
    const a = await trx('orders').insert({ user_id, status: 'TODO', total_amount }).returning('id')
    await trx('order_items').insert({ order_id: a.id, product_id, product_name, quantity, unit_price })
    await trx('order_status_history').insert({ order_id: a.id, status: 'TODO', note })
  })
  .then(function (inserts) {
    rep.send({ message: `${inserts.length} bought items` })
  })
}