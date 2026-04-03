import fastify from "fastify"
import CartRoutes from "./routes/cart.routes.js"
import { DefaultErrorHanlder } from "../errorHandler/errors.js"

export default function Build() {
  const app = fastify()
  DefaultErrorHanlder(app)
  
  app.register(CartRoutes)

  return app
}