const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const Task = require('./db/mongoose-express')
const auth = require('../middleware/auth')
const multer = require('multer')
const { request } = require('express')
const app = express()
const port = process.env.PORT || 3000
const userroute = require('./router/user')
const router = new express.Router()
app.use(userroute)
app.use(express.json()) // to json parser 

//POST Add user success: 201 fail 400 -- user side request frame problem or 409 -- conflict with resource 
app.post('/users',(req, res) => {
    const user = new User(req.body)
    

        // {
        // 'name': 'Vrutti',
        // 'email': 'vvv@gm.co',
        // 'password': 'vrutti11'
        // }

        //err
        // {
        //     "description":"Vrutti",
        //     "completed":"LLL"
        // }

    user.save().then((user)=>{
        res.status(201).send(user)//CREATED
            //{https://stackoverflow.com/questions/27292145/python-boto-list-contents-of-specific-dir-in-bucket
            // name: 'Vrutti',
            // email: 'vvv@gm.co',
            // password: 'vrutti11',
            // _id: new ObjectId("64d4c24cb12f8838a01676a8"),
            // __v: 0
            // }

            //error
            // {"errors":{"completed":{"stringValue":"\"LLL\"","valueType":"string","kind":"Boolean","value":"LLL","path":"completed","reason":{"stringValue":"\"LLL\"","valueType":"string","kind":"boolean","value":"LLL","name":"CastError","message":"Cast to boolean failed for value \"LLL\" (type string) at path \"undefined\""},"name":"CastError","message":"Cast to Boolean failed for value \"LLL\" (type string) at path \"completed\" because of \"CastError\""}},"_message":"Task validation failed","name":"ValidationError","message":"Task validation failed: completed: Cast to Boolean failed for value \"LLL\" (type string) at path \"completed\" because of \"CastError\""}

        }).catch((err)=>{
            res.status(400).send(err)//BAD REQUEST
        })

    // console.log(req.body)
    //{ name: 'Vrutti', email: 'vvv@gm.co', password: 'vrutti11' } as i sent request.body in postmen
    // res.send("test")
})


//get all objects 200 ok 404 not found
app.get('/users',(req,res)=>{
    User.find({}).then((users)=>{//objects.all()
        res.send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })
})
// [
//     {
//         "_id": "64d494021fe1b11853790111",
//         "name": "Vrutti",
//         "age": 22,
//         "__v": 0
//     },
//     {
//         "_id": "64d497faaa7bf34c1f2b0fcb",
//         "name": "ME",
//         "age": 5,
//         "email": "v@g.co",
//         "__v": 0
//     },
//     {
//         "_id": "64d49a9c831b0803acd78172",
//         "name": "ME",
//         "age": 78,
//         "email": "vkkkkkk@g.co",
//         "__v": 0
//     },
//     {
//         "_id": "64d49c2de72afebcebbb3403",
//         "name": "ME",
//         "age": 30,
//         "email": "v@g.co",
//         "password": "1234567",
//         "__v": 0
//     },
//     {
//         "_id": "64d4c24cb12f8838a01676a8",
//         "name": "Vrutti",
//         "email": "vvv@gm.co",
//         "password": "vrutti11",
//         "__v": 0
//     }
// ]

//To get specific objects
app.get('/users/:id',(req,res)=>{

    console.log(req.params)//64d494021fe1b11853790111
    const _id = req.params.id
    User.findById(_id).then((user)=>{

        if(!user){
            return res.status(404).send({"error":"Not Found"})//64d494021fl1b11853790112 not in db
        }
        res.send(user)
        // {
        //     "_id": "64d494021fe1b11853790111",
        //     "name": "Vrutti",
        //     "age": 22,
        //     "__v": 0
        // }
    }).catch((e)=>{
        res.status(500).send()////64d494021f5379 not valid id its !=12()
    })
})



//for task add

app.post('/tasks',auth,(req,res)=>{
    // const task = new Task(req.body)
    console.log(req.body)//{ description: 'ff', completed: true }
    console.log(req.user._id)//new ObjectId("64da75b8b6b38f412ce1946c")
    const task = new Task({
        ...req.body,
        owner:req.user._id
    })
    // {
    //     "description": "ff",
    //     "completed": true,
    // }
    task.save().then(()=>{
        res.send(task)
        // {
        //     "description": "ff",
        //     "completed": true,
        //     "owner": "64d9f1e2efe277efb77c1f8d",
        //     "_id": "64dafe6bb38fd249d7fb0c31",
        //     "createdAt": "2023-08-15T04:26:19.377Z",
        //     "updatedAt": "2023-08-15T04:26:19.377Z",
        //     "__v": 0
        // }
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//get all objects
app.get('/tasks',auth,async (req,res)=>{
    const match = {}
    const sort = {}
    // console.log(req.query.completed)
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
                // sort:{
                //     description:-1
                // }
            }
            // This option specifies how many items you want to skip before starting to retrieve data. For instance, if you set skip to 20, your query will skip the first 20 items and then start retrieving data from the 21st item onwards.
        })//same as req.user.filter("tasks__completed=true")
        res.send(req.user.tasks)
    }catch{
        res.status(500).send()
    }
    // Task.find({}).then((users)=>{//objects.all()
    //     res.send(users)
    // }).catch((e)=>{
    //     res.status(500).send(e)
    // })
})
// [
//     {
//         "_id": "64d495caa6159e7436359143",
//         "description": "Vrutti",
//         "completed": false,
//         "__v": 0
//     },
//     {
//         "_id": "64d618ef62ff9fc3b1da2afc",
//         "description": "Vrutti",
//         "completed": true,
//         "__v": 0
//     }
// ]



//To get specific objects

app.get('/tasks/:id',async (req,res)=>{

    console.log(req.params)//64d618ef62ff9fc3b1da2afc
    const _id = req.params.id
    try{
        const task = await Task.findOne({_id,owner:req.user._id})
        if(!task){
            return res.status(404).send()
        }
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
    // Task.findById(_id).then((task)=>{

    //     if(!task){
    //         return res.status(404).send({"error":"Not Found"})
    //     }
    //     res.send(task)
    //     // {
    //     //     "_id": "64d618ef62ff9fc3b1da2afc",
    //     //     "description": "Vrutti",
    //     //     "completed": true,
    //     //     "__v": 0
    //     // }
    // }).catch((e)=>{
    //     res.status(500).send()////64d494021f5379 not valid id its !=12()
    // })
})

const main = async () =>{
    const task = await Task.findById('64dafe6bb38fd249d7fb0c31')
    await task.populate('owner')
    console.log(task.owner)
    // {
    //     _id: new ObjectId("64da75b8b6b38f412ce1946c"),
    //     name: 'ff',
    //     email: 'ff@gm.co',
    //     tokens: [
    //       {
    //         token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NGRhNzViOGI2YjM4ZjQxMmNlMTk0NmMiLCJpYXQiOjE2OTIwMzg1ODQsImV4cCI6MTY5MjY0MzM4NH0.Oc9cTfUaXD19OH2oGCvnl5YOGkTiMYpmNSPjJ1ZWJmE',
    //         _id: new ObjectId("64da75b8b6b38f412ce1946d")
    //       }
    //     ],
    //     __v: 0
    //   }
    
    const user = await User.findById('64d9f1e2efe277efb77c1f8d')
    await user.populate('tasks')
    console.log(user.tasks)
    // [
    //     {
    //       _id: new ObjectId("64da780a671e98745765f14a"),
    //       description: 'ff',
    //       completed: true,
    //       owner: new ObjectId("64da75b8b6b38f412ce1946c"),
    //       __v: 0
    //     }
    // ]
}
// main()

app.listen(port,()=>{
    console.log("PORT " + port)
})


const upload = multer({
    dest:'images',
    limits:{
        fileSize: 1000000
    },
    fileFilter(req,file,cb){
        if(!file.originalname.match(/\.(doc|docs)$/)){
            return cb(new Error('Please upload PDF.'))
        }
        // if(!file.originalname.endsWith('.pdf')){
        //     return cb(new Error('Please upload PDF.'))
        // }
        cb(undefined,true)
        // cb(new Error('File must be PDF'))
        // cb(undefined,false)
    }
})
app.post('/upload',upload.single('upload'),(req,res)=>{
    res.send()
})