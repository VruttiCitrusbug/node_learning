const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const id_u1 = new mongoose.Types.ObjectId()

const user1 = {
    _id: id_u1, 
    name:"userone",
    email:"userone@gmail.com",
    password:"12345678",
    tokens:[{
        token:jwt.sign({_id:id_u1},process.env.JWT_TOKEN)
    }]
}

const setupdb = async () => {
  await User.deleteMany()
  const userone = await new User(user1).save()   
}

module.exports = {setupdb}