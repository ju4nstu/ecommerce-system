import { CreateCart } from "../services/cart.crud.js"
import { RemoveFromCart } from "../services/cart.crud.js"
import { ListItems } from "../services/cart.crud.js"
import { UpdateCart } from "../services/cart.crud.js"
import { AddNewItem } from "../services/cart.crud.js"

export default function CartRoutes(server, opts) {
  server.get('/', (req, rep) => { rep.send('This is the Shopping Cart API!') })
  
  server.post('/cart/create', CreateCart)
  server.get('/cart/:user_id', ListItems)
  server.put('/cart/update', UpdateCart)
  server.delete('/cart/:product_id/:user_id', RemoveFromCart)
  server.post('/cart/add', AddNewItem)
}