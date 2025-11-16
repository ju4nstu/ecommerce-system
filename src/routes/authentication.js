import fp from 'fastify-plugin'

export default fp (async function jwtAuthentication(server, opts) {
  server.decorate('authentication', async function(req, rep) {
  try {
    await req.jwtVerify() 
  } catch (error) {
    console.error(error)
    return rep.code(401).send({ message: unauthorized })
  }
})
})
