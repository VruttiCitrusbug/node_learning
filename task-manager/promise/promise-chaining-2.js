require('../src/db/mongoose')
const Task = require('../src/models/task')

Task.findByIdAndDelete('64d739e8fdd44ba3faa390e6').then((task)=>{
    console.log(task)
    return Task.countDocuments({completed:false})
}).then((result)=>{
    console.log(result)
}).catch((e)=>{
    console.log(e)
})


// {
//     _id: new ObjectId("64d739e8fdd44ba3faa390e6"),
//     description: 'Vrutti',
//     completed: false,
//     __v: 0
// }
// 0