import db from '../config/db.js'
import * as bcrypt from 'bcrypt'
import { usersSchema } from '../helpers/validate_schema.js'
import { AppError } from '../helpers/errors.js'
import { DBErrors } from '../helpers/database_errors.js'



export default async function userRoutes(server, opts) {
  
  server.post('/signup', { schema: usersSchema, preHandler: server.rateLimit({ max: 5, timeWindow: 300000 }) }, async (req, rep) => {
    const { name, email, password } = req.body

    const hash_password = bcrypt.hashSync(password, 12)

    try {
      await db('users').insert({ name: name, email: email, password_hash: hash_password })
    } 
    catch(error) {
      if (error.code === DBErrors.UNIQUE_VIOLATION) {
        throw AppError.VIOLATES_UNIQUE_CONSTRAINT(email)
      }
    }

    return rep.code(201).send('signed up!')
  })
  
  server.post('/login', { schema: usersSchema, preHandler: server.rateLimit({ max: 5, timeWindow: 300000 }) }, async (req, rep) => {
    const { email, password } = req.body
    
    const user = await db.select('id, name, password_hash').from('users').where('email', email)
    if (user.rows.length === 0) {
      throw AppError.INVALID_CREDENTIALS()
    }
    
    const hash = user.rows[0].password_hash
  
    const cmp = bcrypt.compareSync(password, hash)
    if (!cmp) {
      throw AppError.INVALID_CREDENTIALS()
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

