import { fastify } from 'fastify'
import db from './config/db.js'
import * as bcrypt from 'bcrypt'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import fastifyHelmet from '@fastify/helmet'
import fastifyRateLimit from '@fastify/rate-limit'

import { AppError } from './helpers/errors.js'
import { DefaultErrorHanlder } from './helpers/errors.js'
import jwtAuthentication from "./plugins/authentication.js"
import userRoutes from './routes/users.js'
import checkout from './routes/checkout.js'
import orders from './routes/orders.js'
import products from './routes/products.js'
import OffSetPagination from './helpers/pagination.js'

const server = fastify()
DefaultErrorHanlder(server)

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY
})
server.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET_KEY
})
server.register(fastifyHelmet), {
  contentSecurityPolicy: false,
  global: true // set to false when configuring stripe webhook
} 
server.register(fastifyRateLimit, {
  max: 100,
  timeWindow: 60000
}) 

server.register(jwtAuthentication)
//server.register(OffSetPagination)
server.register(userRoutes)
server.register(checkout)
server.register(orders)
server.register(products)


server.get('/', (req, rep) => {
  rep.send('hello world')
})

server.listen({
  port: 3333,
})

console.log('server listening on http://localhost:3333')