const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const userroute = require('./router/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json()) // to json parser 
app.use(userroute)

//POST Add user success: 201 fail 400 -- user side request frame problem or 409 -- conflict with resource 
app.post('/users',async (req, res) => {
    const user = new User(req.body)
    // {
    //     "name" : "me",
    //     "email": "hehe@gm.co",
    //     "password": "mememem"
    // }
    try {
        await user.save()
        res.status(201).send(user)
        // {
        //     "name": "me",
        //     "email": "hehe@gm.co",
        //     "password": "mememem",
        //     "_id": "64d8ee062fbbe9e0fde6dc9e",
        //     "__v": 0
        // }
    }
    catch(e){
        res.status(400).send(user)
    }

})


//get all objects 200 ok 404 not found
app.get('/users',async (req,res)=>{
    try {
        const user = await User.find({})
        res.send(user)
        //[
        //     {
        //         "_id": "64d735886d133578ece84d22",
        //         "name": "vrutti",
        //         "age": 20,
        //         "email": "vp@g.co",
        //         "password": "aa12322a",
        //         "__v": 0
        //     },
        //     {
        //         "_id": "64d8ee062fbbe9e0fde6dc9e",
        //         "name": "me",
        //         "email": "hehe@gm.co",
        //         "password": "mememem",
        //         "__v": 0
        //     }
        // ]
    }
    catch(e){
        res.status(500).send(e)
    }
})

//To get specific objects
app.get('/users/:id',async (req,res)=>{
    console.log(req.params)//64d494021fe1b11853790111
    const _id = req.params.id
    // try {
    //     const user = await User.find({})
    //     res.send(user)
    // }
    // catch(e){
    //     res.status(500).send(e)
    // }
    try {
        const user = await User.findById(_id)
        res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})


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

app.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowupdates = ['name']
    const isvalid = updates.every((update)=>{
        return allowupdates.includes(update)
    })
    if(! isvalid){
        return res.status(400).send({"error":"invalid update "})
    }

    try {
        // {
        //     "hright":"P"
        // }
        const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
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