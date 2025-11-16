import { fastify } from 'fastify'
import db from './db.js'
import * as bcrypt from 'bcrypt'
import fastifyJwt from '@fastify/jwt'
import fastifyCookie from '@fastify/cookie'

const server = fastify()

server.register(fastifyJwt, {
  secret: process.env.JWT_SECRET_KEY
})

server.register(fastifyCookie, {
  secret: process.env.COOKIE_SECRET_KEY
})  


server.get('/', (req, rep) => {
  rep.send('hello world')
})

server.post('/signup', async (req, rep) => {
  const { name, email, password } = req.body

  const user = await db.raw('select * from users where email = ?', [email])
  
  if (user.rows.length !== 0) {
    return rep.code(401).send('user already exists')
  }

  const hash_password = bcrypt.hashSync(password, 12)

  await db.raw('insert into users(name, email, password_hash) values (?, ?, ?)', [name, email, hash_password])
  return rep.code(201).send('signed up!')
})

server.post('/login', async (req, rep) => {
  const { email, password } = req.body
  
  const user = await db.raw('select email, password_hash, name, id from users where email = ?', [email])
  //console.log(user.rows[0])
  if (user.rows.length === 0) {
    return rep.code(401).send({ message: 'wrong credentials' })
  }
  
  const hash = user.rows[0].password_hash

  const cmp = bcrypt.compareSync(password, hash)
  if (!cmp) {
    return rep.code(401).send({ message: 'wrong credentials' })
  }
  
  const payload = { userid: user.rows[0].id, username: user.rows[0].name }
  console.log(payload)

  const token = server.jwt.sign(payload, { expiresIn: '1h' })
  rep.setCookie('token', token, {
    path: '/',
    secure: false,
    httpOnly: true
  })
  .code(200)
  .send({message: 'cookie sent', jwttoken: token})
  
  return rep.send({ username: user.rows[0].name, userid: user.rows[0].id, token: token })
})

server.decorate('authentication', async function(req, rep) {
  try {
    const user = await req.jwtVerify() 
  } catch (error) {
    rep.code(401).send({ message: error })
    console.error(error)
  }
})

server.get('/orders', { preHandler: [server.authentication] }, async (req, rep) => {
  const user = req.user
  try {
    var listOrders = await db.raw('select * from orders where user_id = ?', [user.userid])
  } catch (err) {
    console.error('/orders error:', err)
  }

  return rep.code(201).send({ message: `orders from user ${user.username}`, orders: listOrders.rows })
})

server.get('/products', async (req, rep) => {
  const products = await db.raw('select * from products')
  return rep.send({ message: 'list of products', products: products.rows })
})

server.get('/profile', { preHandler: server.authentication }, async (req, rep) => {
  const user = req.user
  rep.send({user: user})
})


server.post('/checkout', /*{ preHandler: server.authentication },*/ async (req, rep) => {
  // req.body -> id, name, quantity, price
  console.log('req body -> ', req.body)
  let finalPrice = 0
  for (let i = 0; i < req.body.length; i++) {
    console.log(req.body[i].id)
    const stockDB = await db.raw('select stock, name, price from products where id = ?', [req.body[i].id])
    if (stockDB.rows.length === 0) {
      return `the given id (product ${req.body[i].id}) do not match any product in db`
    }
    
    let sum = req.body[i].price * req.body[i].quantity
    finalPrice += sum
    


    if (stockDB.rows[0].price !== req.body[i].price) {
      return 'the price inside req.body and the price inside db do not match'
    }
    
    const len = stockDB.rows.length 
    if (len === 0) {
      return 'this product does not exist'
    }
    
    //console.log('quantity loop -> ', req.body[i].quantity)
    if (stockDB.rows[0].stock < req.body[i].quantity) {
      return `the quantity of the product ${stockDB.rows[0].name} is bigger than its available stock`
    }
    
  }

  return `final price -> ${finalPrice}`

  // STRIPE API
})


server.listen({
  port: 3333,
})
console.log('server listening on http://localhost:3333')