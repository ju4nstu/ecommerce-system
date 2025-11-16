import db from '../config/db.js'
import * as bcrypt from 'bcrypt'

export default async function userRoutes(server, opts) {
  
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

  server.get('/profile', { preHandler: server.authentication }, async (req, rep) => {
    const user = req.user
    rep.send({user: user})
  })

}

