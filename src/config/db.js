import 'dotenv/config'
/*import http from 'http';
import { neon } from '@neondatabase/serverless';

export const sql = neon(process.env.DATABASE_URL);

const requestHandler = async (req, res) => {
  const result = await sql`SELECT version()`;
  const { version } = result[0];
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end(version);
};
*/

import knex from 'knex'
import config from './knexfile.js'

const db = knex(config)

export default db