import 'dotenv/config'

export default {
  client: 'pg',
  connection: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  migrations: {
    directory: './migrations'
  }
}