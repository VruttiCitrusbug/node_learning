const request = require('supertest')
const app = require('../src/app')
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')

const id_u1 = new mongoose.Types.ObjectId()

const userone = {
    _id: id_u1, 
    name:"userone",
    email:"userone@gmail.com",
    password:"12345678",
    tokens:[{
        token:jwt.sign({_id:id_u1},process.env.JWT_TOKEN)
    }]
}


beforeEach(async ()=>{
    await User.deleteMany()
    await new User(userone).save()
})

// afterEach(()=>{
//     console.log("aftereach")
// })

test('should signup a new user',async () => {
    const response = await request(app).post("/users").send({
        "name":"user1",
        "email":"user1@gmail.com",
        "password":"12345678"
    }).expect(201)
    const user = await User.findById(response.body._id)
    expect(user).not.toBeNull()
    // expect(user.name).toBe("user1")
    expect(response.body).toMatchObject({
        name:"user1",
        email:"user1@gmail.com"
    })
    expect(user.password).not.toBe("12345678")
})

test('should login a existing user',async () => {
    const response = await request(app).post("/user/login").send({
        "email":"userone@gmail.com",
        "password":"12345678"
    }).expect(200)

    const user = await User.findOne({email:"userone@gmail.com"})
    expect(response.body.token).toBe(user.tokens[1].token)

})

test('should not login a existing user',async () => {
    await request(app).post("/user/login").send({
        "email":"usertwo@gmail.com",
        "password":"12345678"
    }).expect(403)
})

test('should get profile for a existing user',async () => {
    await request(app).post("/user/login").send({
        "email":"usertwo@gmail.com",
        "password":"12345678"
    }).expect(403)
})

test('should get profile for a authenticate user',async () => {
    await request(app)
    .get("/user/me")
    .set('Authorization',`${userone.tokens[0].token}`)
    .send()
    .expect(200)
})

test('should not get profile for a unauthenticate user',async () => {
    await request(app)
    .get("/user/me")
    .set('Authorization',`fake ${userone.tokens[0].token}`)
    .send()
    .expect(401)
})

test('should delete a authenticate user',async () => {
    await request(app)
    .delete("/user/me")
    .set('Authorization',`${userone.tokens[0].token}`)
    .send()
    .expect(200)
    const user = await User.findById(userone._id)
    expect(user).toBeNull()
})

test('should not delete a unauthenticate user',async () => {
    await request(app)
    .delete("/user/me")
    .set('Authorization',`fake ${userone.tokens[0].token}`)
    .send({"error":"please authenticate"})
    .expect(401)
})

test('should update a existing user',async () => {
    const response = await request(app).patch("/user/me")
    .set('Authorization',`${userone.tokens[0].token}`)
    .send({
        "name":"user2"
    })
    .expect(200)

    const user = await User.findById(userone._id)
    expect(user.name).toBe("user2")
})

test('should not update a unauthorized field',async () => {
    const response = await request(app).patch("/user/me")
    .set('Authorization',`${userone.tokens[0].token}`)
    .send({
        "location":"nashik"
    })
    .expect(400)
})