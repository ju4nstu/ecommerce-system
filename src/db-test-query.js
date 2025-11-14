import { sql } from './db.js'

//sql`update products set stock = 3 where id = 1;`.then(console.log('updated'))

const query = await sql`select id, name from products`
for (const row of query) {
  console.log(row.id, row.name)
}

