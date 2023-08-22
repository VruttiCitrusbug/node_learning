const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const Task = require('../models/task')

router.post('/tasks',auth,(req,res)=>{

    console.log(req.body)
    console.log(req.user._id)
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })

    task.save().then(()=>{
        res.status(201).send(task)

    }).catch((e)=>{
        res.status(400).send(e)
    })
})

router.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}
    
    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sort){
        parts = req.query.sort.split(":")
        sort[parts[0]]=parts[1]==='desc'?-1:1
    }

    try{
        console.log(req.query.limit)
        await req.user.populate({
            path:'tasks',
            match,
            options:{
                limit:parseInt(req.query.limit),
                skip:parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch{
        res.status(500).send()
    }

})

router.delete('/tasks/:id',auth,async (req,res)=>{
    const task = await Task.findById(req.params.id)
    if(req.user.id != task.owner._id){
        return res.status(403).send({error:"unauthenticate"})
    }
    try{

        const task = await Task.findByIdAndDelete(req.params.id)

        if(!task){
            res.status(400).send({error:"task not exist."})
        }
        res.send({success:"task deleted successfully."})
    }
    catch(e){
        res.status(500).send({error:e})
    }
    
})

router.patch('/tasks/:id',auth,async (req,res)=>{
    const task = await Task.findById(req.params.id)
    if(!task){
        return res.send({error:"no task!"})
    }
    if(req.user.id != task.owner._id){
        return res.status(403).send({error:"unauthenticate"})
    }
    const updates = Object.keys(req.body)
    const allowupdates = ['completed']
    const isvalid = updates.every((update)=>{
        return allowupdates.includes(update)
    })
    if(!isvalid){
        return res.status(400).send({"error":"invalid update"})
    }
    try {
        // const user = await User.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})//if not exis add new
        const task = await Task.findById(req.params.id)
        updates.forEach((update)=>{
            task[update]=req.body[update]
        })
        await task.save()
        if(!task){
            return res.status(400).send({error:"task not exist."})
        }
        res.send(task)
    }
    catch(e){
        res.status(500).send({error:e})
    }
})


module.exports = router