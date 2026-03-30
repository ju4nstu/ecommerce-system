import { Search } from "../services/product.search.js"
import { Product } from "../services/product.details.js"

export default async function productRoutes(server, opts) {
  server.get('/search/:input', Search)

  server.get('/product/:id', Product)
}