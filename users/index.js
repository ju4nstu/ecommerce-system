import Build from "./app.js"

const PORT = process.env.PORT //|| 5000
const server = Build()

server.listen({
  port: PORT
}).then(console.log(`listening in port ${PORT}`))





