import db from "../config/db.js"

/*export async function List(req, rep) {
  // pagination

  const res = await db('product').select('*').where('is_active', '=', true)

  return rep.send({ products: res })
}*/

async function Pagination(page_number, page_size, sort) {
  // filters = sort
  let offset = (page_number - 1) * page_size
  //const count = await db('product').count('*')
  
  let page = await db('product').select('*').where('is_active', '=', true).orderBy(sort, 'asc').limit(page_size).offset(offset)
  return page
}

const page_number = 2
const page_size = 2
const sort = 'price'


console.log(await Pagination(page_number, page_size, sort))