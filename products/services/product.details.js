import db from "../config/db.js"

import { AppError } from "../../src/helpers/errors.js"


export async function Product(req, rep) {
  const prodId = req.params.id 

  try {
    const res = await db('product')
    .select('*')
    .where('product_id', '=', prodId)
    .andWhere('is_active', '=', true)
    
    if (res.length === 0) throw AppError.NOT_FOUND()

    //console.log(res)
    return rep.send({ product: res })
  } catch (error) {
    console.log(error)
  }
  
}