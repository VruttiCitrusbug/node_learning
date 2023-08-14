const mongoose = require('mongoose')
const validator = require('validator')

// const User = mongoose.model('User',{
//     name:{
//         type:String,
//         require:true
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
//     },
//     password:{
//         type:String,
//         require:true,
//         minlength: 7,
//         trim:true,
//         validate(val){
//             if(val.toLowerCase().includes("pass")){
//                 throw new Error('Not valid PASS')
//             }
//         }
//     }
// })


const userschema = new mongoose.Schema(
    {
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
    }
)

userschema.pre('save',async function(next) {
    const user = this
    console.log("BEFORE SAVE")
    next()
})

const User = mongoose.model('User',userschema)
module.exports=User