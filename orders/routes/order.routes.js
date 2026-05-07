import { PlaceOrder } from "../services/order.js"

export default async function OrderRoutes(server) {
  server.get('/', (req, rep) => { rep.send('This is the Orders API!') })
  server.post('/order', PlaceOrder)

}