import db from '../config/db.js'

export async function Search(req, rep) {
  const search = req.params.input

  const res = await db('product')
  .select('product_id', 'product_name', 'price')
  .where('sku', 'ilike', `%${search}%`)
  .orWhere('product_name', 'ilike', `%${search}%`)
  
  //console.log('search input =>', search)
  rep.send({ result: res })
}