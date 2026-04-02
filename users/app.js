import fastify from "fastify"
import fastifyJwt from "@fastify/jwt"
import fastifyCookie from "@fastify/cookie"

import { loginRoute } from "./routes/user.route.js"
import { signUpRoute } from "./routes/user.route.js"
import { returnDataBaseDataRoute } from "./routes/user.route.js"
import { userProfileRoute } from "./routes/user.route.js"
import { DefaultErrorHanlder } from "../errorHandler/errors.js"

export default function Build() {
  const app = fastify()

  DefaultErrorHanlder(app)

  app.register(fastifyJwt, {
    secret: process.env.JWT_SECRET
  })
  app.register(fastifyCookie, {
    secret: process.env.COOKIE_SECRET
  })

  app.decorate('authentication', async function (req, rep) {
    console.log(req)
    try {
      await req.jwtVerify()
    } catch (err) {
      return rep.code(401).send({ message: `unauthorized`/*, req: req*/ })
    }
  })

  app.register(returnDataBaseDataRoute)
  app.register(signUpRoute)
  app.register(loginRoute)
  app.register(userProfileRoute)

  return app
}