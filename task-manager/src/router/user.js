const express = require('express')
const router = new express.Router()
const User = require('../models/user')
const auth = require('../../middleware/auth')
// router.use((req,res,next)=>{
//     if(req.method === 'GET'){
//         res.send("unable")
//     }else{
//         next()
//     }
//     // console.log(req.method,req.path)
//     next()
// })

//get all objects 200 ok 404 not found
router.get('/users',auth,async (req,res)=>{
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
router.get('/users/:id',async (req,res)=>{
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

router.delete('/users/me',auth,async (req,res)=>{
    
    try {
        await User.findByIdAndRemove(req.user._id)
        res.send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

router.patch('/users/me',auth,async (req,res)=>{
    
    try {
        const user = await User.findByIdAndUpdate(req.user._id,req.body,{new:true,runValidators:true})//if not exis add new
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = router