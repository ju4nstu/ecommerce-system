import db from '../config/db.js'
import { AppError } from '../../errorHandler/errors.js'
import { DataBaseError } from '../../errorHandler/dbError.js'

async function SelectCartId(knex, user_id) {
  const id = await knex('cart')
  .select('cart_id')
  .where('user_id', user_id)

  return id[0].cart_id
}

export async function CreateCart(req, rep) {
  const { user_id, product_id, quantity } = req.body
  
  try {
    await db.transaction(async trx => {
    const id = await trx('cart')
    .insert({ user_id })
    .returning('cart_id')
    
    await trx('cart_items')
    .insert({ product_id, cart_id: id[0].cart_id, quantity })
  })
  return rep.code(201).send({ message: 'item added to cart!' })
  } catch (err) {
    if (err.code === DataBaseError.UNIQUE_CONSTRIANT) {
      //console.log(err)
      throw AppError.CART_VIOLATES_UNIQUE_CONSTRAINT()
    } else {
      //console.log(err)
      throw err
    }
  }
}


export async function AddNewItem(req, rep) {
  const { user_id, product_id, quantity } = req.body
  
  await db.transaction(async trx => {
    const cart_id = await SelectCartId(trx, user_id)

    await trx('cart_items')
    .insert({ product_id, cart_id, quantity })
  })
  return rep.code(201).send({ message: 'item added to cart!' })
}


export async function UpdateCart(req, rep) {
  const { user_id, product_id, quantity } = req.body

  await db.transaction(async trx => {
    const id = await SelectCartId(trx, user_id)
    
    await trx('cart_items')
    .where('cart_id', id)
    .andWhere('product_id', product_id)
    .update({ quantity })
  })

  return rep.send({ message: 'Cart updated!' })
}


export async function RemoveFromCart(req, rep) {
  const { product_id, user_id } = req.params
  const id = await SelectCartId(db, parseInt(user_id, 10))
  
  await db('cart_items')
  .where('product_id', parseInt(product_id, 10))
  .andWhere('cart_id', id)
  .del()

  return rep.code(200).send({ message: 'item removed from cart!' })  
}


export async function ListItems(req, rep) {
  const { user_id } = req.params
  
  const id = await SelectCartId(db, parseInt(user_id, 10))
  
  const res = await db('cart_items')
  .select('*')
  .where('cart_id', id)
  
  return rep.code(200).send(res)
}
