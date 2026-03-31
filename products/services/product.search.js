import db from '../config/db.js'
import { AppError } from "../../errorHandler/errors.js"

export async function Search(req, rep) {
  const search = req.params.input

  const res = await db('product')
  .select('product_id', 'product_name', 'price')
  .where('sku', 'ilike', `%${search}%`)
  .orWhere('product_name', 'ilike', `%${search}%`)
  
  if (res.length === 0) throw AppError.NOT_FOUND()

  return rep.send({ result: res })
}