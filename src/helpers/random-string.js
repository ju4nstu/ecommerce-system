import * as crypto from 'node:crypto'
const c = crypto.randomBytes(32).toString('hex')
console.log(c)