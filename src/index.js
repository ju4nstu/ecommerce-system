import { fastify } from 'fastify'
import db from './config/db.js'
import * as bcrypt from 'bcrypt'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

import jwtAuthentication from './routes/authentication.js'
import userRoutes from './routes/users.js'
import checkout from './routes/checkout.js'
import orders from './routes/orders.js'
import products from './routes/products.js'

const server = fastify()

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY
})
server.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET_KEY
})  

server.register(jwtAuthentication)
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