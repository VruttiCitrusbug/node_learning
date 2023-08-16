const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');


// const tsk=new Task({
//     {
//     "description": "ff",
//     "completed": true,
//     "owner": "64da75b8b6b38f412ce1946c",
//     "_id": "64da780a671e98745765f14a",
//     "__v": 0
// }
// })


const taskschema = new mongoose.Schema(
    {
        description:{
            type:String
        },
        completed:{
            type:Boolean,
             default:false
        },
        owner:{
            type: mongoose.Schema.Types.ObjectId, //store type data ie new ObjrctId('id')
            require:true,
            ref:'User'
        }
    }, 
    {
        timestamps: true
    }
    
)

const Task = mongoose.model('Task',taskschema)
module.exports=Task