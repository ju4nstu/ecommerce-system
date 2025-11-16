import db from '../config/db.js'

export default async function orders(server, opts) {
  server.get('/orders', { preHandler: [server.authentication] }, async (req, rep) => {
    const user = req.user
    try {
      var listOrders = await db.raw('select * from orders where user_id = ?', [user.userid])
    } catch (err) {
      console.error('/orders error:', err)
    }
  
    return rep.code(201).send({ message: `orders from user ${user.username}`, orders: listOrders.rows })
  })
}
