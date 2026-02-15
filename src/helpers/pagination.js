import db from "../config/db.js"
import { AppError } from "./errors.js"

const schema = [ "products", "orders", "product_categories", "users", "categories" ]

export default async function OffSetPagination(req, rep, table) {
  const page = req.query.page || 1
  const limit = req.query.limit || 2

  const offset = (page - 1) * limit

  if (!schema.includes(table)) {
    throw new AppError('unauthorized', 401)
  }

  // fetch the data skipping the offset, limiting the amount of data
  const pageContent = await db.raw(`select * from ${table} order by id desc limit ${limit} offset ${offset}`)

  return rep.send({ message: "trying off-set pagination", content: pageContent.rows })
}