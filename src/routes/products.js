import db from '../config/db.js'
import OffSetPagination from '../helpers/pagination.js'

export default async function productsFunction(server, opts) {
  server.get('/products', async (req, rep) => {
    const table = "products"
    return OffSetPagination(req, rep, table)
    //const products = await db.raw('select * from products')
    //return rep.send({ message: 'list of products', products: products.rows })
  })
}
