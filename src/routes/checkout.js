import db from '../config/db.js'
import Stripe from 'stripe'
import { AppError } from '../helpers/errors.js'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

export default async function checkout(server, opts) {

  server.post('/checkout', { preHandler: server.authentication }, async (req, rep) => {
    let finalPrice = 0

    const reqItemsProp = (prop) => req.body.map(item => item[prop])

    const q = await db('products').whereIn('id', reqItemsProp('id'))
    const queryItemsProp = (prop) => q.map(item => item[prop])

    for (let i = 0; i < req.body.length; i++) {
      if (!queryItemsProp('id').includes(req.body[i].id)) {
        throw new AppError('item does not exist.', 400)
      }

      if (queryItemsProp('price')[i] !== req.body[i].price) {
        throw new AppError('price dismatch between db and requisition body.', 400)
      }
      
      if (queryItemsProp('stock')[i] < req.body[i].quantity) {
        throw new AppError('not available stock', 400)
      }

      let sum = req.body[i].price * req.body[i].quantity
      finalPrice += sum
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(finalPrice),
      currency: 'brl',
      automatic_payment_methods: {
        enabled: true
      },
    })
    
    const userIdMap = reqItemsProp('id').map((id) => ({
      user_id: req.user.userid,
      product_id: id,
    }))
    
    try {
      await db.transaction(async (trx) => {
        await db('products').whereIn('id', reqItemsProp('id'))
        .decrement('stock', reqItemsProp('stock'))
        
        await db('orders').insert(userIdMap)
      })
    } catch (err) {
      console.log(err)
    }
    
    return rep.code(201).send({ clientSecret: paymentIntent.client_secret })
  })

}
