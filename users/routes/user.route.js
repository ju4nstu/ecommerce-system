import { usersSignUpSchema, usersSignInSchema } from '../models/userSchema.js'
import { updateSchema } from '../models/profileSchema.js'
import { loginLogic, signUpLogic, returnDataBaseData, userProfile } from '../services/user.service.js'
import { deleteUser, updateUserData } from '../services/profile.service.js'

export async function loginRoute(server, opts) {
  server.post('/signin', { schema: usersSignInSchema }, loginLogic)
}

export async function signUpRoute(server, opts) {
  server.post('/signup', { schema: usersSignUpSchema }, signUpLogic)
}

export async function returnDataBaseDataRoute(server, opts) {
  server.get('/database', returnDataBaseData)
}

export async function userProfileRoute(server, opts) {
  server.get('/', (req, rep) => { rep.send('This is the Users API') })
  server.get('/profile', { preHandler: server.authentication }, userProfile)
  server.put('/profile', { preHandler: server.authentication, schema: updateSchema }, updateUserData)
  server.delete('/profile', { preHandler: server.authentication }, deleteUser)
}
