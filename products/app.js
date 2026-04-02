import fastify from "fastify"
import fastifyHelmet from "@fastify/helmet"
import fastifyRateLimit from "@fastify/rate-limit"

import productRoutes from "./routes/product.route.js"
import { DefaultErrorHanlder } from "../errorHandler/errors.js"

export default function Build() {
  const app = fastify()

  DefaultErrorHanlder(app)

  app.register(fastifyRateLimit, {
    max: 100,
    timeWindow: '1 minute',
    global: true // might wanna change
  })
  
  app.register(fastifyHelmet, {
    contentSecurityPolicy: false, // defines wheter a content is safe or not (scripts, images, styles)
    global: true // all routes has Helmet headers
  })
  
  app.register(productRoutes, { prefix: '/products' })

  return app
}