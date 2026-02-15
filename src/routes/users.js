import db from '../config/db.js'
import * as bcrypt from 'bcrypt'
import { AppError } from '../helpers/errors.js'
import { DBErrors } from '../helpers/database_errors.js'

export default async function userRoutes(server, opts) {
  
  server.post('/signup', { preHandler: server.rateLimit({ max: 5, timeWindow: 300000 }) }, async (req, rep) => {
    const { name, email, password } = req.body
  
    const hash_password = bcrypt.hashSync(password, 12)

    try {
      await db.raw('insert into users(name, email, password_hash) values (?, ?, ?)', [name, email, hash_password])
    } 
    catch(error) {
      if (error.code === DBErrors.UNIQUE_VIOLATION) {
        throw new AppError("email already exists.")
      }
    }

    return rep.code(201).send('signed up!')
  })
  
  server.post('/login', { preHandler: server.rateLimit({ max: 5, timeWindow: 300000 }) }, async (req, rep) => {
    const { email, password } = req.body
    
    const user = await db.raw('select email, password_hash, name, id from users where email = ?', [email])
    //console.log(user.rows[0])
    if (user.rows.length === 0) {
      throw new AppError('wrong credentials', 401)
    }
    
    const hash = user.rows[0].password_hash
  
    const cmp = bcrypt.compareSync(password, hash)
    if (!cmp) {
      throw new AppError('wrong credentials', 401)
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

  server.get('/profile', { preHandler: server.authentication }, async (req, rep) => {
    const user = req.user
    rep.send({user: user})
  })

}

