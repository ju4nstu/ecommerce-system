import { Add } from "../services/cart.service.js"
import { Remove } from "../services/cart.service.js"

export default function CartRoutes(server, opts) {
  server.get('/', (req, rep) => { rep.send('This is the Shopping Cart API!') })
  server.post('/cart', Add)
  server.delete('/cart', Remove)
}