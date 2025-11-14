import { fastify } from 'fastify'
import fastifyStatic from '@fastify/static'
import fastifyView from '@fastify/view'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'
import formbody from '@fastify/formbody'
import fastifyCors from '@fastify/cors'
import ejs from 'ejs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { sql } from './db.js'
import * as bcrypt from 'bcrypt'


const server = fastify()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

server.register(fastifyView, {
  engine: {
    ejs: ejs
  },
  root: path.join(__dirname, '../views')
})

server.register(fastifyStatic, {
  root: path.join(__dirname, '../public'),
  prefix: '/'
})

server.register(formbody)

server.register(fastifyCors, {
  origin: 'http://localhost:5000',
  credentials: true
})

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY,
  sign: {
    expiresIn: '15m'
  }  
})

server.register(fastifyCookie, {
  secret: 'my-secret-key-for-signing-cookies'
})


server.get('/', async (req, rep) => {
  return rep.view('index.ejs')
})

server.get('/api/products', async (req, rep) => {
  const get_products = await sql`select id, name, description, stock, price from products;`
  return get_products
})


server.post('/signup', async (req, rep) => {
  try {
    const { name, email, password } = req.body
    
    const rows = await sql`select * from users where email = ${email}`
    
    if (rows.length > 0) {
      console.log('user already exists')
      return rep.redirect('/')
    }
  
    const hash_password = await bcrypt.hash(password, 12)

    await sql`insert into users(name, email, password_hash) values (${name}, ${email}, ${hash_password})`
    
  } catch (error) {
    console.log(error)
  }
}) 

server.post('/login', async (req, rep) => {
  const { email, password } = req.body

  try {
    const users = await sql`select id, name, password_hash from users where email = ${email}`
    const user = users[0]

    if (!user) {
      return rep.code(401).send({ message: "wrong credentials" })
    }
    
    const checkPass = bcrypt.compareSync(password, user.password_hash)
    if (!checkPass) {
      return rep.code(401).send({ message: "wrong credentials" })
    }

    const jwt_token = rep.jwtSign({
      "user_id": user.id,
      "user_name": user.name,
    })

    rep.setCookie('token', jwt_token, {
      httpOnly: true,
      secure: false,
      path: '/',
      maxAge: 60 * 15
    })

    return {
      token: jwt_token,
      message: "login successful",
      user: user.name
    }
    //return JSON.stringify({token: jwt_token, message: "hi"})
  } catch(err) { console.log(err) }
})

server.decorate('authenticate', async function (req, rep) {
  try {  
    await req.jwtVerify()
  } catch(err) { rep.code(401).send({ error: 'unauthorized' }) }
})


server.get('/secure-route', { preHandler: [server.authenticate] }, (req, rep) => {
  // check cookie
  return { message: 'you are logged in', user: req.user }
  // let it pass
})

server.listen({
  port: 5000
})
console.log('listening on http://localhost:5000')
