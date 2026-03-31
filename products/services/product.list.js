import db from "../config/db.js"

export async function List(req, rep) {
  const page_number = req.query.page_number || 1
  const page_size = req.query.page_size || 10
  const sort = req.query.sort || 'price'

  const res = await Pagination(page_number, page_size, sort)
  return rep.send({ products: res })
}

async function Pagination(page_number, page_size, sort) { // check if sort is in map, then assign its value
  try {
    const orderOptions = new Map([
      ['price', { value: 'price', key: 'asc' }],
      ['-price', { value: 'price', key: 'desc' }],
    ])
    const getOrder = orderOptions.get(sort)
    
    let offset = (page_number - 1) * page_size  
    let page = await db('product')
    .select('*')
    .where('is_active', '=', true)
    .orderBy(getOrder.value, getOrder.key)
    .limit(page_size)
    .offset(offset)
    
    return page
  } catch (error) {
    console.log(error)
  }
}



// const page_number = 2
// const page_size = 2
// const sort = 'price'
// console.log(await Pagination(page_number, page_size, sort))