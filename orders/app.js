import fastify from 'fastify'
import { DefaultErrorHanlder } from '../errorHandler/errors.js'

export default function Build() {
  const app = fastify()
  DefaultErrorHanlder(app)

  app.get('/', (req, rep) => {
    rep.send('This is the Orders API!')
  })

  return app
}