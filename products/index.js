import Build from './app.js'
import 'dotenv/config'

const PORT = process.env.PORT
const server = Build()

server.listen({
  port: PORT
}).then(console.log(`Server listening on port ${PORT}`))