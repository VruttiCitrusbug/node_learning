const express = require('express')
const router = new express.Router()
const auth = require('../middleware/auth')
const User = require('../models/user')
const multer = require('multer')
const sharp = require('sharp')


const storage = multer.memoryStorage()
// const upload_to = multer({ storage: storage })

const upload = multer({
    // dest:'images',
    storage: storage,
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(png|jpeg)$/)){
            return cb(new Error('Please upload png.'))
        }
        cb(undefined,true)
    }
})

router.get('/avatar/:id',async (req,res)=>{
    // http://localhost:3000/avatar/64df624dacd1c3400f802ff9
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

router.delete('/users/me/avatar',auth,async (req,res) => {
    req.user.avatar = undefined
    await req.user.save()
    return res.send(req.user)
})


router.post('/users/me/avatar',auth,upload.single('avatar'),async (req,res) => {

    buffer = await sharp(req.file.buffer).resize({width:250,height:250}).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    return res.send(req.user)

}
,(err,req,res,next)=>{
    res.status(400).send({error:err.message})
}
)

router.get('/avatar/me',auth,async (req,res)=>{
    // http://localhost:3000/avatar/64df624dacd1c3400f802ff9
    try{
        if(!req.user.avatar){
            throw new Error("err")
        }
        // res.set('Content-Type','application/json') default
        res.set('Content-Type','image/png')
        res.send(req.user.avatar)
    }
    catch(e){
        res.status(404).send("err")
    }
})
module.exports = router