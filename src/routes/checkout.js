import db from '../config/db.js'

export default async function checkout(server, opts) {
  server.post('/checkout', /*{ preHandler: server.authentication },*/ async (req, rep) => {
    // req.body -> id, name, quantity, price
    console.log('req body -> ', req.body)
    let finalPrice = 0
    for (let i = 0; i < req.body.length; i++) {
      console.log(req.body[i].id)
      const stockDB = await db.raw('select stock, name, price from products where id = ?', [req.body[i].id])
      if (stockDB.rows.length === 0) {
        return `the given id (product ${req.body[i].id}) do not match any product in db`
      }
      
      let sum = req.body[i].price * req.body[i].quantity
      finalPrice += sum
  
      if (stockDB.rows[0].price !== req.body[i].price) {
        return 'the price inside req.body and the price inside db do not match'
      }
      
      const len = stockDB.rows.length 
      if (len === 0) {
        return 'this product does not exist'
      }
      
      //console.log('quantity loop -> ', req.body[i].quantity)
      if (stockDB.rows[0].stock < req.body[i].quantity) {
        return `the quantity of the product ${stockDB.rows[0].name} is bigger than its available stock`
      }
      
    }
  
    return `final price -> ${finalPrice}`
  
    // STRIPE API
  })
}
