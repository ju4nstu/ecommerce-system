import fastify from "fastify"

import productRoutes from "./routes/product.route.js"
import { DefaultErrorHanlder } from "../src/helpers/errors.js"

export default function Build() {
  const app = fastify()

  DefaultErrorHanlder(app)

  app.register(productRoutes)

  app.get('/', (req, rep) => {
    rep.send('hello world')
  })

  return app
}