import 'dotenv/config'
import db from './db.js'

try {
  const res = await db.raw('SELECT 1')
  console.log('conectado', res.rows)
} catch (e) {
  console.error('erro ao conectar: ', e)
} finally {
  await db.destroy()
}