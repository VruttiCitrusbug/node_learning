const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const userroute = require('./task-operation.js')
const bcrypt = require('bcryptjs')
const { request } = require('express')
const auth = require('../middleware/auth')
const app = express()
const port = process.env.PORT || 3000
const sharp = require('sharp')
const multer = require('multer')

app.use(express.json()) // to json parser 
app.use(userroute)
const fs = require('fs');

// const token = await user.generateAuthToken()

app.post('/users',async (req, res) => {
    const user = new User(req.body)
    try {
        await user.save()
        res.status(201).send({user})
    }
    catch(e){
        res.status(400).send({error:e})
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
app.get('/users/:id',async (req,res)=>{
    console.log(req.params)
    const _id = req.params.id
    try {
        const user = await User.findById(_id)
        res.send(user)
    }
    catch(e){
        res.status(400).send(e)
    }

})

app.post('/users/login',async (req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user:await user.getPublicProfile(),token})
    }catch{
        res.status(400).send()
    }
})
app.post('/users/logout',auth,async (req,res) => {
    
    try{
        req.user.tokens = req.user.tokens.filter((token)=>{
            return token.token !== req.token
        })
        console.log(req.user.tokens,"PPPPPPPPPPP")
        await req.user.save()
        console.log(req.user,"LLLLLLLLLLLLLL")
        res.send()
    }catch(e){
        res.status(400).send(e)
    }
})
app.post('/users/logoutAll',auth,async (req,res) => {
    try{
        req.user.token = []
        await request.user.save()
        res.send()
    }
    catch(e){
        res.status(500).send()
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

upload = multer({
    dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(jpg|jpeg|png)$/)){
            console.log(true)
            return cb(new Error('Please upload Image.'))
        }
        cb(undefined,true)
    }
})

app.get('/avatar/:id',async (req,res)=>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error("err")
        }
        // res.set('Content-Type','application/json') default
        res.set('Content-Type','image/png')
        res.send(user.avatar)
    }
    catch(e){
        res.status(404).send("err")
    }
})

app.delete('/users/me/avatar',auth,async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    return res.send(req.user)
})

app.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res) => {

    console.log(req.file)
    buffer = await sharp(request.file.buffer).resize({width:250,height:250}).png().toBuffer()
    request.user.avatar = buffer
    await req.user.save()
    return res.send(req.user)
}
,(err,req,res,next)=>{
    res.status(400).send({error:err.message})
}
)

app.listen(port,()=>{
    console.log("PORT " + port)
})