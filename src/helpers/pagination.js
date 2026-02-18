import db from "../config/db.js"
import { AppError } from "./errors.js"

// const schema_tables = [ "products", "orders", "product_categories", "users", "categories" ]
// const schema_query = [ "price", "-price"]

export default async function OffSetPaginationAndSorting(req, rep, table) {
  const page_number = req.query.page_number || 1
  const page_size = req.query.page_size || 10
  const page_sort = req.query.page_sort

  const offset = (page_number - 1) * page_size

  // if (!schema_tables.includes(table)) {
  //   throw new AppError.UNAUTHORIZED
  // }

  if (page_sort === undefined) {
    await db(table).orderBy('id', 'desc').limit(page_size).offset(offset)
  }


  return rep.send({ message: "trying off-set pagination", content: pagecontent })
}

// export default async function PageSort(req, rep) {
//   const page_sort = req.query.page_sort

// }