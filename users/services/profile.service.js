import db from "../config/db.js"

export async function updateUserData(req, rep) {
  console.log(req.user)  
  try {
    await db('profile')
    .where({ user_id: req.user.user_id })
    .update({ 
      name: req.body.user_name,
      birth_date: req.body.user_birth,
      phone: req.body.user_phone
    })
  }
  catch(err){
    console.log(err)
    rep.send({ message: 'error' })
  }
  rep.code(201).send({ message: 'updated!' })
}

export async function deleteUser(req, rep) {
  try {
    await db('profile')
    .where({ user_id: req.user.user_id})
    .del('*')
  }
  catch(err) {
    console.log(err)
  }
}