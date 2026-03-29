import db from "./config/db.js"

db('product_category').select('*').then(res => { console.log(res) })
//db('product_category').insert({ category_name: 'Eletronics', slug: 'eletronics' }).then(res => {console.log(res)})