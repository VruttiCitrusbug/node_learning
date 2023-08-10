const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.post('/users',(req, res) => {
    const user = new User(req.body)
    user.save().then((tsk)=>{
        res.send(user)
            //{
            // name: 'Vrutti',
            // email: 'vvv@gm.co',
            // password: 'vrutti11',
            // _id: new ObjectId("64d4c24cb12f8838a01676a8"),
            // __v: 0
            // }
        }).catch((err)=>{
            res.send(err)
        })

    // console.log(req.body)
    //{ name: 'Vrutti', email: 'vvv@gm.co', password: 'vrutti11' } as i sent request.body in postmen
    // res.send("test")
})

app.listen(port,()=>{
    console.log("PORT "+port)
})