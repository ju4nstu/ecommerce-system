import fastify from "fastify"
import httpProxy from "@fastify/http-proxy"
import 'dotenv/config'

const server = fastify()
const port = process.env.PORT

server.register(httpProxy, {
  upstream: process.env.USERS_API_URL,
  prefix: '/users',
})

server.register(httpProxy, {
  upstream: process.env.PRODUCTS_API_URL,
  prefix: '/products',
  rewritePrefix: '/products'
})

server.register(httpProxy, {
  upstream: process.env.CART_API_URL,
  prefix: '/cart',
  rewritePrefix: '/cart'
})

server.listen({
  port
}).then(console.log(`server listening on port ${port}`))