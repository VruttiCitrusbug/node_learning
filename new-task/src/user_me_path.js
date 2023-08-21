const express = require('express')
const app = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')

app.get('/user/me',auth,async (req,res)=>{
    try {
        res.status(200).send(req.user)
    }
    catch(e){
        res.status(500).send(e)
    }
})

app.patch('/user/me',auth,async (req,res)=>{
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
        const user = await User.findById(req.user._id)
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

app.delete('/user/me',auth,async (req,res)=>{
    try {
        const user = await User.findByIdAndDelete(req.user._id)
        res.status(200).send({success:"user deleted successfully."})
    }
    catch(e){
        res.status(500).send(e)
    }
})

module.exports = app