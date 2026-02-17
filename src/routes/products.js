import OffSetPagination from '../helpers/pagination.js'

export default async function productsFunction(server, opts) {
  server.get('/products', async (req, rep) => {
    const table = "products"
    return OffSetPagination(req, rep, table)
  })
}
