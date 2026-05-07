import 'dotenv/config'

export default {
  client: 'pg',
  connection: process.env.DATABASE_ENV === 'test' ? process.env.DATABASE_TEST_URL : process.env.DATABASE_PROD_URL,
  ssl: { rejectUnauthorized: false },
  migrations: {
    directory: './migrations'
  }
}