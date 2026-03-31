import db from "../config/db.js"
import { AppError } from "../../errorHandler/errors.js"

export async function Product(req, rep) {
  const prodId = req.params.id 

  const res = await db('product')
  .select('*')
  .where('product_id', '=', prodId)
  .andWhere('is_active', '=', true)
  
  if (res.length === 0) throw AppError.NOT_FOUND()

  return rep.send({ product: res })
}