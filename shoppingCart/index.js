import Build from "./app.js"
import 'dotenv/config'

const server = Build()

server.listen({
  port: process.env.PORT
}).then(console.log(`server listening on port ${process.env.PORT}`))