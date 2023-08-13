require('../src/db/mongoose')
const User = require('../src/models/user')

// User.findByIdAndUpdate('64d73566b77bc9e16c63f72a',{name:'parth'}).then((user)=>{
//     console.log(user)
//     return User.countDocuments({name:'parth'})
// }).then((result)=>{
//     console.log(result)
// }).catch((e)=>{
//     console.log(e)
// })

// {
//     _id: new ObjectId("64d73566b77bc9e16c63f72a"),
//     name: 'parth',
//     age: 30,
//     email: 'v@g.co',
//     password: '1234567',
//     __v: 0
//   }
//   1


User.findByIdAndDelete('64d73566b77bc9e16c63f72a').then((user)=>{
    console.log(user)
    return User.countDocuments({name:'HELLO'})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})

// {
//     _id: new ObjectId("64d73566b77bc9e16c63f72a"),
//     name: 'HELLO',
//     age: 30,
//     email: 'v@g.co',
//     password: '1234567',
//     __v: 0
//   }
//   0

// const updateandcount = async (id,name) => {
//     const user = await User.findByIdAndUpdate(id,{name})
//     const count = await User.countDocuments({name})
//     return count
// }

// updateandcount('64d73566b77bc9e16c63f72a',"HELLO").then((count)=>{
//     console.log(count) //1
// }).catch((e)=>{
//     console.log(e)
// })

const deleteandcount = async (id) => {
    const user = await User.findByIdAndUpdate(id)
    const count = await User.countDocuments({name:"vrutti"})
    return count
}

deleteandcount('64d735886d133578ece84d22').then((count)=>{
    console.log(count) //1
}).catch((e)=>{
    console.log(e)
})
