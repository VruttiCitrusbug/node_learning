//Create 2 models

const mongoose = require('mongoose')
const validator = require('validator')
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');
// const User = mongoose.model('User',{
//     name:{
//         type:String
//     },
//     age:{
//         type:Number
//     }
// })
//validation error 
// const me1=new User({
//     name:'Vrutti',
//     age:'ddd'
// })
// const me=new User({
//     name:'Vrutti',
//     age:22
// })
// me.save().then((me)=>{
// console.log(me)
// }).catch((err)=>{
//     console.log(err)
//     // {
//     //     name: 'Vrutti',
//     //     age: 22,
//     //     _id: new ObjectId("64d494021fe1b11853790111"),
//     //     __v: 0 //version key
//     //   }
// })

// const Task = mongoose.model('Task',{
//     description:{
//         type:String
//     },
//     completed:{
//         type:Boolean,
//          default:false
//     }
// })
// const tsk=new Task({
//     description:'Vrutti',
//     completed:false
// })

// tsk.save().then((tsk)=>{
// console.log(tsk)
// }).catch((err)=>{
//     console.log(err)
//     // {
//     //     description: 'Vrutti',
//     //     completed: false,
//     //     _id: new ObjectId("64d495caa6159e7436359143"),
//     //     __v: 0
//     //   }
// })


//validate model

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         require:true
//     },
//     age:{
//         type:Number,
//         validate(val){
//             if(val < 0){
//                 throw new Error('Age must be a positive numer')
//             }
//         }
//     },
//     email:{
//         type:String,
//         require:true,
//         trim:true,
//         lowercase:true,
//         validate(val){
//             if(!validator.isEmail(val)){
//                 throw new Error('Not valid')
//             }
//         }
//     }
// })
// const i=new User({
//         name:'ME',
//         email:'v@g.co',
//         age:-1
//     })
// i.save().then((tsk)=>{
// console.log(tsk)
// }).catch((err)=>{
//     console.log(err)
//      // User validation failed: age: Age must be a positive numer
// })


//Trim lowercase
// const i=new User({
//         name:'ME',
//         email:'              vKKKKKK@g.co        ',
//         age:78
//     })
// i.save().then((tsk)=>{
// console.log(tsk)
// }).catch((err)=>{
//     console.log(err)
//      // User validation failed: age: Age must be a positive numer
//     //  {
//     //     name: 'ME',
//     //     age: 78,
//     //     email: 'vkkkkkk@g.co',
//     //     _id: new ObjectId("64d49a9c831b0803acd78172"),
//     //     __v: 0
//     //   }
// })


// const User = mongoose.model('User',{
//         name:{
//             type:String,
//             require:true
//         },
//         age:{
//             type:Number,
//             validate(val){
//                 if(val < 0){
//                     throw new Error('Age must be a positive numer')
//                 }
//             }
//         },
//         email:{
//             type:String,
//             require:true,
//             trim:true,
//             lowercase:true,
//             validate(val){
//                 if(!validator.isEmail(val)){
//                     throw new Error('Not valid')
//                 }
//             }
//         },
//         password:{
//             type:String,
//             require:true,
//             minlength: 7,
//             trim:true,
//             validate(val){
//                 if(val.toLowerCase().includes("pass")){
//                     throw new Error('Not valid PASS')
//                 }
//             }
//         }
//     })
//     const i=new User({
//             name:'ME',
//             email:'v@g.co',
//             age:30,
//             password:'1234567'
//             // password:'     4PasswoRd ' err password
//         })
//     i.save().then((tsk)=>{
//     console.log(tsk)
//     }).catch((err)=>{
//         console.log(err)
//         // {
//         //     name: 'ME',
//         //     age: 30,
//         //     email: 'v@g.co',
//         //     password: '1234567',
//         //     _id: new ObjectId("64d49c2de72afebcebbb3403"),
//         //     __v: 0
//         //   }
//     })
    