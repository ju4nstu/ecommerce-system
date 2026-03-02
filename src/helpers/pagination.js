import db from "../config/db.js"
import { AppError } from "./errors.js"

export default async function OffSetPaginationAndSorting(req, rep, table, category) {
  const page_number = req.query.page_number || 1
  const page_size = req.query.page_size || 10
  const page_sort = req.query.page_sort
  const offset = (page_number - 1) * page_size
  
  if (category === undefined ) return rep.send({ search: `/${table}?page_number=${page_number}&page_size=${page_size}&page_sort=${page_sort}`, content: await pageSort(page_sort, page_size, table, offset, category) })
  return rep.send({ search: `/${table}/${category}?page_number=${page_number}&page_size=${page_size}&page_sort=${page_sort}`, content: await pageSort(page_sort, page_size, table, offset, category) })
}

const categoryIdMap = {
  "undefined": 0,
  "eletronics": 1,
  "clothing": 2,
  "home-garden": 3,
  "smartphones": 4,
  "laptops": 5,
  "mens-clothing": 6,
  "womens-clothing": 7,
  "furniture": 8
}

function getCategoryId(category) {
  return categoryIdMap[category] ?? null
}

async function pageSort(sort_option, page_size, table, offset, category) {
  // sort: price, -price | start simple
  //console.log(!getCategoryId(category))
  if (category !== undefined && !getCategoryId(category)) {
    throw new AppError('Invalid category', 400)
  }

  switch(sort_option) {
    case "price":
      // select ids that belong to this category; select data that belong to this id
      if (category !== undefined) {
        try {
          return await db(table)
          .join('product_category', 'products.id', '=', 'product_category.product_id')
          .where('product_category.category_id', '=', `${getCategoryId(category)}` )
          .orderBy('price', 'asc').limit(page_size).offset(offset)
        } catch (err) {
          console.log(err)
        }
      }
      else {
        return await db(table).orderBy('price', 'asc').limit(page_size).offset(offset)
      }
      break
  
    case "-price":
      if (category !== undefined) {
        try {
          return await db(table)
          .join('product_category', 'products.id', '=', 'product_category.product_id')
          .where('product_category.category_id', '=', `${getCategoryId(category)}`)
          .orderBy('price', 'desc').limit(page_size).offset(offset)
        } catch (err) {
          console.log(err)
        }
      }
      else {
        return await db(table).orderBy('price', 'desc').limit(page_size).offset(offset)
      }
    
    default:
      return await db(table).orderBy('id', 'desc').limit(page_size).offset(offset)

  }

}
