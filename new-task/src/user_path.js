// DB connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/new-task-api');

// initiate app.listen port
const express = require('express');
const app = express()

// to json parser 
app.use(express.json()) 

//import user model and middleware to authentication
const User = require('../models/user')
const auth = require('../middleware/auth')

//path to router 
const userroute = require('./task_path')
app.use(userroute)

const avatarroute = require('./user_avatar_path')
app.use(avatarroute)

app.post('/users',async (req, res) => {
    const user = new User(req.body)
    try{
        await user.save()
        res.status(201).send(user)

    }catch(error){
        res.status(400).send({error:error})
    }
})

app.post('/user/login',async (req, res) => {
    try{
        console.log(req.body)

        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:await user.getPublicProfile(),token})

    }catch(e){
        res.status(403).send({error:"invalid data"})
    }
})

app.post('/users/logout',auth,async (req,res) => {
    
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log(req.user.tokens)
        await req.user.save()
        console.log(req.user)
        res.send({success:"Successfully loged out"})
    }catch(e){
        res.status(400).send(e)
    }
})

app.get('/users',auth,async (req,res)=>{
    try {
        const user = await User.find({})
        res.send(user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.delete('/users/:id',async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.params.id)
        if(!user){
            res.status(400).send({error:"user not exist."})
        }
        res.send({success:"user deleted successfully."})
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.patch('/users/:id',async (req,res)=>{
    const updates = Object.keys(req.body)
    const allowupdates = ['name','email','password']
    const isvalid = updates.every((update)=>{
        return allowupdates.includes(update)
    })
    if(! isvalid){
        return res.status(400).send({"error":"invalid update"})
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
        res.send(user)
    }
    catch(e){
        res.status(500).send({error:e})
    }
})

//USER FILE UPLOAD




const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log("PORT " + port)
})