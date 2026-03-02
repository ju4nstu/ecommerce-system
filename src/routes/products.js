import OffSetPaginationAndSorting from '../helpers/pagination.js'

export default async function productsFunction(server, opts) {
  server.get('/products/:category', async (req, rep) => {
    const category_req = req.params.category

    const table = "products"
    return OffSetPaginationAndSorting(req, rep, table, category_req)
  })

  server.get('/products', async (req, rep) => {
    const table = "products"
    return OffSetPaginationAndSorting(req, rep, table, undefined)
  })
}
