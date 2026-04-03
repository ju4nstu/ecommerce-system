import { CreateCart } from "../services/cart.service.js"
import { RemoveFromCart } from "../services/cart.service.js"
import { ListItems } from "../services/cart.service.js"
import { UpdateCart } from "../services/cart.service.js"

export default function CartRoutes(server, opts) {
  server.get('/', (req, rep) => { rep.send('This is the Shopping Cart API!') })
  server.post('/cart', CreateCart)
  server.delete('/cart', RemoveFromCart)
  server.get('/cart', ListItems)
  server.put('/cart',UpdateCart)
}