const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const Task = require('./db/mongoose-express')

const app = express()
const port = process.env.PORT || 3000

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

app.post('/tasks',(req,res)=>{
    const task = new Task(req.body)
    // {
    //     "description":"Vrutti",
    //     "completed":true
    // }
    task.save().then(()=>{
        res.send(task)
        //{"description":"Vrutti","completed":true,"_id":"64d618ef62ff9fc3b1da2afc","__v":0}
    }).catch((e)=>{
        res.status(400).send(e)
    })
})

//get all objects
app.get('/tasks',(req,res)=>{
    Task.find({}).then((users)=>{//objects.all()
        res.send(users)
    }).catch((e)=>{
        res.status(500).send(e)
    })
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

app.get('/tasks/:id',(req,res)=>{

    console.log(req.params)//64d618ef62ff9fc3b1da2afc
    const _id = req.params.id
    Task.findById(_id).then((task)=>{

        if(!task){
            return res.status(404).send({"error":"Not Found"})
        }
        res.send(task)
        // {
        //     "_id": "64d618ef62ff9fc3b1da2afc",
        //     "description": "Vrutti",
        //     "completed": true,
        //     "__v": 0
        // }
    }).catch((e)=>{
        res.status(500).send()////64d494021f5379 not valid id its !=12()
    })
})




app.listen(port,()=>{
    console.log("PORT " + port)
})