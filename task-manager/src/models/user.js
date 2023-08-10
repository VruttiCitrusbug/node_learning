const mongoose = require('mongoose')
const validator = require('validator')
// mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api');

const User = mongoose.model('User',{
    name:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        trim:true,
        lowercase:true,
        validate(val){
            if(!validator.isEmail(val)){
                throw new Error('Not valid')
            }
        }
    },
    password:{
        type:String,
        require:true,
        minlength: 7,
        trim:true,
        validate(val){
            if(val.toLowerCase().includes("pass")){
                throw new Error('Not valid PASS')
            }
        }
    }
})
module.exports=User