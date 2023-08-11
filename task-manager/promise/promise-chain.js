require('../src/db/mongoose')
const User = require('../src/models/user')
User.findByIdAndUpdate('64d49c2de72afebcebbb3403',{age:22}).then((user)=>{
    console.log(user)
    return User.countDocuments({age:22})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

// {
//     _id: new ObjectId("64d49c2de72afebcebbb3403"),
//     name: 'ME',
//     age: 30,
//     email: 'v@g.co',
//     password: '1234567',
//     __v: 0
//   }
//   1