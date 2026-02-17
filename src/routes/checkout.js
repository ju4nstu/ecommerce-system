import db from '../config/db.js'
import Stripe from 'stripe'
import { AppError } from '../helpers/errors.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function checkout(server, opts) {

  server.post('/checkout', /*{ preHandler: server.authentication },*/ async (req, rep) => {
    let finalPrice = 0

    const item_ids_prices_quantities = req.body.map(item => ({
      id: item.id, price: item.price, quantity: item.quantity
    }))
    const getProp = (prop) => item_ids_prices_quantities.map(item => item[prop])
  
    const q = await db('products').whereIn('id', getProp('id'))

    for (let i = 0; i < req.body.length; i++) {
      if (!q.includes(req.body[i].id)) {
        throw new AppError('item does not exist.', 400)
      }
      
      if (q[i].price !== req.body[i].price) {
        throw new AppError('price dismatch between db and requisition body.', 400)
      }
      
      if (q[i].stock < req.body[i].quantity) {
        throw new AppError('not available stock', 400)
      }

      let sum = req.body[i].price * req.body[i].quantity
      finalPrice += sum
    }

    // everytime i have a successful purchase, i need to decrement x at the stock in db.
    // if the client cancel his acquisition, increment x at the stock. 

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalPrice),
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true
      },
    })
  
    return rep.code(201).send({ clientSecret: paymentIntent.client_secret })
  })

}
