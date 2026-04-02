import db from "../config/db.js"
import * as bcrypt from 'bcrypt'
import { AppError } from '../../errorHandler/errors.js'
import { DBErrors } from '../../src/helpers/database_errors.js'
import { checkAge } from './checkAge.service.js'
import { Entropy } from "./passwordStrength.js"

function genToken(server, rep, payload) {
  const token = server.jwt.sign(payload, { expiresIn: process.env.JWT_TOKEN_EXPIRES_IN })
  rep.setCookie('token', token, {
    path: '/',
    secure: false,
    httpOnly: true
  })
  return token
}

export async function loginLogic(req, rep) {
  const { name, email, password } = req.body
  
  const user = await db('account').where({ email: email }).select('id', 'password_hash')

  if (user[0] === undefined) {
    throw AppError.INVALID_CREDENTIALS()
  }

  const hash = user[0].password_hash

  const cmp = bcrypt.compareSync(password, hash)
  if (!cmp) {
    throw AppError.INVALID_CREDENTIALS()
  }
  
  const payload = { 
    user_id: user[0].id, 
  }

  const token = genToken(req.server, rep, payload)
  
  return rep.send({ userid: user[0].id, token: token })
}


export async function signUpLogic(req, rep) {
  const { name, email, password, birthday, phone } = req.body
  
  if (!Entropy(password.length)) throw rep.code(401).send({ message: 'weak password' })
  if (!checkAge(birthday)) throw rep.code(401).send({ message: 'you need to be 18 or older' })
    
  const hash_password = bcrypt.hashSync(password, 12)

  try {
    await db.transaction(async trx => {
      const account = await trx('account').insert({ email: email, password_hash: hash_password }).returning('id')
      await trx('profile').insert({ user_id: account[0].id, name: name, phone: phone, birth_date: birthday })
    })
  } 
  
  catch(error) {
    if (error.code === DBErrors.UNIQUE_VIOLATION) {
      throw AppError.VIOLATES_UNIQUE_CONSTRAINT(email)
    }
    console.log(error)
    throw rep.code(500).send({ message: "Sorry, something went wrong :(" })
  }
  
  return rep.code(201).send({ message: 'signed up!' })
}

export async function userProfile(req, rep) {
  const user = await db('profile')
  .select('*')
  .where('user_id', '=', req.user.userid)
  
  rep.code(200).send({ user_data: user })
}

export async function returnDataBaseData(req, rep) {
  rep.send({ 
    account: await db('account').select('*'),
    profile: await db('profile').select('*')
  }) 
}