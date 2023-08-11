const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const Task = mongoose.model('Task',{
    description:{
        type:String
    },
    completed:{
        type:Boolean,
         default:false
    }
})
// const tsk=new Task({
//     description:'Vrutti',
//     completed:false
// })

module.exports=Task