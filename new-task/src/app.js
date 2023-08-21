const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTION_URL);

const express = require('express')
const app = express()
app.use(express.json())

taskRouter = require('./task_path')
userRouter = require('./user_path')
useravatarRouter = require('./user_avatar_path')
userme = require('./user_me_path')

app.use(userRouter)
app.use(taskRouter)
app.use(useravatarRouter)
app.use(useravatarRouter)
app.use(userme)

module.exports = app