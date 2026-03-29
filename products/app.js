import fastify from "fastify"

export default function Build() {
  const app = fastify()

  app.get('/', (req, rep) => {
    rep.send('hello world')
  })

  return app
}