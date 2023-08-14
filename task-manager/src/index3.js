const express = require('express')
require('./db/mongoose-express')
const User = require('./models/user')
const userroute = require('./router/user')

const app = express()

app.use(express.json()) // to json parser 
app.use(userroute)

//The next keywork refer to the next middleware that will run after yours to process the request. In the end of your function, you call next() to pass the control to the next middleware.
// Something like, "Hey, I've done my job for this request. I give it to you, do your job" :)

const jwt = require('jsonwebtoken')

const myfun = async () =>{

    const token = jwt.sign({_id:"1234"},'thisismynewtoken', {expiresIn:'7 days'}) // https://www.base64decode.org/ (value decoded : { _id: '1234', iat: 1692001817, exp: 1692606617 })
    console.log(token)//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiIxMjM0IiwiaWF0IjoxNjkyMDAxMDEyfQ.zjtvrldrIz1TYjf7IBKs-mddQ8-DUM1YvgdQZzXtIjg
//three part base 64 encoded json string |                  |                                          |
//                      1-header(algo,type of jwt token)    . 2-payload or body(resposnce.data)        . 3-signature that verify token

    const data = jwt.verify(token,'thisismynewtoken')
    console.log(data)//{ _id: '1234', iat: 1692001817, exp: 1692606617 }

}
myfun()


//Withmiddelware ==> new request --> run route handler
//Withmiddelware ==> new request --> do something --> run route handler