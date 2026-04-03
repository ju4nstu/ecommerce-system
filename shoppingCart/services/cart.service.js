import db from '../config/db.js'
import { AppError } from '../../errorHandler/errors.js'


export async function Add(req, rep) {
  const { user_id, item_id, item_quantity } = req.body
  
  await db('cart').insert({ user_id: user_id, item_id: item_id, item_quantity: item_quantity })
  return rep.code(201).send({ message: 'item added to cart!' })
}

export async function Remove(req, rep) {
  const { item_id, user_id } = req.body

  await db('cart').where('item_id', item_id).andWhere('user_id', user_id).del()
  return rep.code(200).send({ message: 'item removed from cart!' })  
}


/*
{
  product_id,
  quantity
}
*/

/*
CREATE TABLE cart(
  cart_id serial primary key,
  user_id integer not null ON DELETE CASCADE,
  item_id integer not null ON DELETE CASCADE,
  item_quantity integer not null default 1 check (item_quantity > 0),
  created_at TIMESTAMPZ not null default now(),
  updated_at TIMESTAMPZ not null default now(),

  CONSTRAINT unique_user_item UNIQUE (user_id, cart_id)
);
CREATE INDEX idx_item_quantity ON cart(item_quantity);
CREATE INDEX idx_item_id ON cart(item_id);
CREATE INDEX idx_user_id ON cart(user_id);

*/