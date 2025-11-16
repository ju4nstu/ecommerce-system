import db from '../config/db.js'

export default async function products(server, opts) {
  server.get('/products', async (req, rep) => {
    const products = await db.raw('select * from products')
    return rep.send({ message: 'list of products', products: products.rows })
  })
}
