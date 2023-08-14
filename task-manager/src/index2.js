const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const userroute = require('./router/user')
const bcrypt = require('bcryptjs')
const { request } = require('express')
const auth = require('../middleware/auth')
const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // to json parser 
app.use(userroute)


//POST Add user success: 201 fail 400 -- user side request frame problem or 409 -- conflict with resource 
app.post('/users',async (req, res) => {
    const user = new User(req.body)
    const token = await user.generateAuthToken()
    // {
    //     "name" : "me",
    //     "email": "hehe@gm.co",
    //     "password": "mememem"
    // }
    try {
        await user.save()
        res.status(201).send({user,token})
        // {
        //     "name": "me",
        //     "email": "hehe@gm.co",
        //     "password": "mememem",
        //     "_id": "64d8ee062fbbe9e0fde6dc9e",
        //     "__v": 0
        // }

        // {
        //     "user": {
        //         "name": "aa",
        //         "email": "aa@g.co",
        //         "password": "$2a$08$LUlrcYIKJ.gqNqokV2d6Y.RupDYktT6YwYguJGSGXcy4gLo8qqC62",
        //         "_id": "64d9f1e2efe277efb77c1f8d",
        //         "tokens": [
        //             {
        //                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5ZjFlMmVmZTI3N2VmYjc3YzFmOGQiLCJpYXQiOjE2OTIwMDQ4MzQsImV4cCI6MTY5MjYwOTYzNH0.yEFurY3yIFXNNfTYzV9wx0VyEIAaPtLK4X98z-Apyws",
        //                 "_id": "64d9f1e2efe277efb77c1f8e"
        //             }
        //         ],
        //         "__v": 0
        //     },
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5ZjFlMmVmZTI3N2VmYjc3YzFmOGQiLCJpYXQiOjE2OTIwMDQ4MzQsImV4cCI6MTY5MjYwOTYzNH0.yEFurY3yIFXNNfTYzV9wx0VyEIAaPtLK4X98z-Apyws"
        // }
    }
    catch(e){
        res.status(400).send(user)
    }

})

app.post('/users/login',auth,async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
        // {
        //     "user": {
        //         "_id": "64d9b43381ade954a12297b5",
        //         "name": "rrrr",
        //         "email": "jj@g.co",
        //         "password": "$2a$08$S8vQTy0FyauUP5yewaOf1ON3B/YIm2zm1TqwihYS/89HRNQwxyxom",
        //         "__v": 1,
        //         "tokens": [
        //             {
        //                 "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5YjQzMzgxYWRlOTU0YTEyMjk3YjUiLCJpYXQiOjE2OTIwMDQzMjEsImV4cCI6MTY5MjYwOTEyMX0.OhG59q0HTkwYe1MTOb3dC9p_ma3qSgeEcwWSUCEywJ8",
        //                 "_id": "64d9efe1167d21ae0813891a"
        //             }
        //         ]
        //     },
        //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5YjQzMzgxYWRlOTU0YTEyMjk3YjUiLCJpYXQiOjE2OTIwMDQzMjEsImV4cCI6MTY5MjYwOTEyMX0.OhG59q0HTkwYe1MTOb3dC9p_ma3qSgeEcwWSUCEywJ8"
        // }
    }catch{
        res.status(400).send()
    }
})

app.post('/users/logout',auth,async (req,res) => {
    
    try{
        req.user.token = req.user.tokens.filter((token)=>{
            console.log(token.token)
            return token.token !== req.token
        })
        console.log(req.user.token)
        await req.user.save()
        res.send(req.user)
        // {
        //     "_id": "64d9f1e2efe277efb77c1f8d",
        //     "name": "aa",
        //     "email": "aa@g.co",
        //     "password": "$2a$08$LUlrcYIKJ.gqNqokV2d6Y.RupDYktT6YwYguJGSGXcy4gLo8qqC62",
        //     "tokens": [
        //         {
        //             "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGQ5ZjFlMmVmZTI3N2VmYjc3YzFmOGQiLCJpYXQiOjE2OTIwMDQ4MzQsImV4cCI6MTY5MjYwOTYzNH0.yEFurY3yIFXNNfTYzV9wx0VyEIAaPtLK4X98z-Apyws",
        //             "_id": "64d9f1e2efe277efb77c1f8e"
        //         }
        //     ],
        //     "__v": 0
        // }
    }catch(e){
        res.status(400).send()
    }
})
// //get all objects 200 ok 404 not found
// app.get('/users',async (req,res)=>{
//     try {
//         const user = await User.find({})
//         res.send(user)
//         //[
//         //     {
//         //         "_id": "64d735886d133578ece84d22",
//         //         "name": "vrutti",
//         //         "age": 20,
//         //         "email": "vp@g.co",
//         //         "password": "aa12322a",
//         //         "__v": 0
//         //     },
//         //     {
//         //         "_id": "64d8ee062fbbe9e0fde6dc9e",
//         //         "name": "me",
//         //         "email": "hehe@gm.co",
//         //         "password": "mememem",
//         //         "__v": 0
//         //     }
//         // ]
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

// //To get specific objects
// app.get('/users/:id',async (req,res)=>{
//     console.log(req.params)//64d494021fe1b11853790111
//     const _id = req.params.id
//     // try {
//     //     const user = await User.find({})
//     //     res.send(user)
//     // }
//     // catch(e){
//     //     res.status(500).send(e)
//     // }
//     try {
//         const user = await User.findById(_id)
//         res.send(user)
//     }
//     catch(e){
//         res.status(400).send(e)
//     }

// })


app.listen(port,()=>{
    console.log("PORT " + port)
})

// app.patch('/users/:id',async (req,res)=>{
//     try {
//         // {
//         //     "hright":"P"
//         // }
//         const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
//         if(!user){
//             res.status(400).send()
//         }
//         res.send(user)//not effected
//         // {
//         //     "_id": "64d735886d133578ece84d22",
//         //     "name": "vrutti",
//         //     "age": 20,
//         //     "email": "vp@g.co",
//         //     "password": "hehehehehhe",
//         //     "__v": 0
//         // }
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

//restric allow update

// app.patch('/users/:id',async (req,res)=>{
//     const updates = Object.keys(req.body)
//     const allowupdates = ['name']
//     const isvalid = updates.every((update)=>{
//         return allowupdates.includes(update)
//     })
//     if(! isvalid){
//         return res.status(400).send({"error":"invalid update "})
//     }
//     try {
//         // {
//         //     "hright":"P"
//         // }
//         // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
//         const user = await User.findById(req.params.id)
        
//         updates.forEach((update)=>{
//             user[update]=req.body[update]
//         })
//         await user.save()
//         if(!user){
//             return res.status(400).send()
//         }
//         res.send(user)//not effected
//         // {"error":"invalid update "}
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })


app.delete('/users/:id',async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)//if not exis add new
        if(!user){
            res.status(400).send()
        }
        res.send(user)//not effected
        // {"error":"invalid update "}
    }
    catch(e){
        res.status(500).send(e)
    }
})



// const myfun = async () =>{
//     const pass ="red1233"
//     const hash = await bcrypt.hash(pass,8)//8 time execution of one algorithm
//     console.log(hash)//$2a$08$MfGVwhbjOYnciiu2zGBzQ.oYglVVz9Az1yflsL.xZJglHCPU547ju
//     console.log(pass)//red1233
//     const ismatch = await bcrypt.compare(pass,hash)
//     console.log(ismatch)//true
// }
// myfun()




// app.patch('/users/:id',async (req,res)=>{
//     try {
//         // {
//         //     "hright":"P"
//         // }
//         const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
//         if(!user){
//             res.status(400).send()
//         }
//         res.send(user)//not effected
//         // {
//         //     "_id": "64d735886d133578ece84d22",
//         //     "name": "vrutti",
//         //     "age": 20,
//         //     "email": "vp@g.co",
//         //     "password": "hehehehehhe",
//         //     "__v": 0
//         // }
//     }
//     catch(e){
//         res.status(500).send(e)
//     }
// })

app.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowupdates = ['name','password']
    const isvalid = updates.every((update)=>{
        return allowupdates.includes(update)
    })
    if(! isvalid){
        return res.status(400).send({"error":"invalid update "})
    }

    try {
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
        const user = await User.findById(req.params.id)
        updates.forEach((update)=>{
            user[update]=req.body[update]
        })
        await user.save()
        if(!user){
            return res.status(400).send()
        }

        if(!user){
            res.status(400).send()
        }
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})