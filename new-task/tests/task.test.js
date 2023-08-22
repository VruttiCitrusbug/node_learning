const request = require('supertest')
const app = require('../src/app')
const User = require('../models/user')
const Task = require('../models/task')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const id_u1 = new mongoose.Types.ObjectId()
const id_u2 = new mongoose.Types.ObjectId()

const userone = {
    _id: id_u1, 
    name:"userone",
    email:"userone@gmail.com",
    password:"12345678",
    tokens:[{
        token:jwt.sign({_id:id_u1},process.env.JWT_TOKEN)
    }]
}

const usertwo = {
    _id: id_u2, 
    name:"usertwo",
    email:"usertwo@gmail.com",
    password:"12345678",
    tokens:[{
        token:jwt.sign({_id:id_u1},process.env.JWT_TOKEN)
    }]
}

const userone_task1 = {
    _id:new mongoose.Types.ObjectId(),
    description:"task1foruser1",
    completed:false,
    owner:userone._id
}

const userone_task2 = {
    _id:new mongoose.Types.ObjectId(),
    description:"task2foruser1",
    completed:false,
    owner:userone._id
}

const usertwo_task2 = {
    _id:new mongoose.Types.ObjectId(),
    description:"task2foruser2",
    completed:false,
    owner:usertwo._id
}

beforeEach(async ()=>{
    await User.deleteMany()
    await Task.deleteMany()
    await new User(userone).save()
    await new User(usertwo).save()
    await new Task(userone_task1).save()
    await new Task(userone_task2).save()
    await new Task(usertwo_task2).save()
})


test('Should fatch user task',async () => {
    const response = await request(app).get('/tasks')
    .set('Authorization',`${userone.tokens[0].token}`)
    .send()
    .expect(200)

    expect(response.body.length).toEqual(2)
})


test('create task for user',async ()=>{
    const response = await request(app).post("/tasks").send({
        "description":"user1@gmail.com",
        "completed":"true"
    })
    .set('Authorization',`${userone.tokens[0].token}`)
    .expect(201)
    const task = await Task.findById(response.body._id)
    expect(task).not.toBeNull()
})

test('Should not delete another user task',async () => {
    const response = await request(app)
    .delete(`/tasks/${usertwo_task2._id}`)
    .set('Authorization',`${userone.tokens[0].token}`)
    .send()
    .expect(403)
})

test('Should not delete authenticate user task',async () => {
    const response = await request(app)
    .delete(`/tasks/${userone_task2._id}`)
    .set('Authorization',`${userone.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not update other user tasks',async () => {
    const response = await request(app)
    .patch(`/tasks/${userone_task2._id}`)
    .set('Authorization',`${userone.tokens[0].token}`)
    .send({
        "completed":"true"
    })
    .expect(200)
    expect(response.body.completed).toBe(true)
})

test('Should not update other user tasks',async () => {
    const response = await request(app)
    .patch(`/tasks/${usertwo_task2._id}`)
    .set('Authorization',`${userone.tokens[0].token}`)
    .send({
        "completed":"true"
    })
    .expect(403)
})