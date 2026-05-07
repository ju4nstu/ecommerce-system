import Build from "./app.js"
import 'dotenv/config'

const server = Build()
const port = process.env.PORT

server.listen({
  port
}).then(console.log(`server listening on port ${port}`))

