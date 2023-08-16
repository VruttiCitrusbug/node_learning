const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('../db/mongoose-express')
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
            // unique:true,
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
        },tokens:[{
            token:{
                type:String,
                require:true
            }
        }],
        avatar:{
            type:Buffer
        }
    },{
        timestamps:true
    }
    // { by add timestamp
    //     "name": "ii",
    //     "email": "ii@gm.co",
    //     "password": "$2a$08$1m51HGIFjyzUTldCOpYygepU4E32zLvdtE11.KKDqt5iozoH89zJa",
    //     "_id": "64da870cf0e7f8bdb949d5bd",
    //     "tokens": [],
    //     "createdAt": "2023-08-14T19:57:00.756Z",
    //     "updatedAt": "2023-08-14T19:57:00.756Z",
    //     "__v": 0
    // }
    
)

userschema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})

    if(!user){
        throw new Error('unable to log in')
    }
    const ismatch = await bcrypt.compare(password,user.password)

    if(!ismatch){
        throw new Error('unable to log in')
    }
    return user
}

userschema.methods.generateAuthToken = async function() {
    const user = this
    console.log(user._id.toString())//64d9b43381ade954a12297b5
    const token = await jwt.sign({_id:user._id.toString()},'thisismynewtoken', {expiresIn:'7 days'})
    console.log(token)
    user.tokens = user.tokens.concat({ token })
    //.concat() method to add a new token to the user.tokens array.
    console.log(user.tokens)
    await user.save()
    return token
}

userschema.methods.getPublicProfile = async function() {
    
    const user = this
    const userobj = user.toObject()

    delete userobj.password
    delete userobj.tokens

    return userobj
}


userschema.pre('save',async function(next) {
    const user = this
    console.log(user.isModified('password'))
    if(user.isModified('password'))
    {user.password=await bcrypt.hash(user.password,8)}
    next()
})

userschema.virtual('tasks',{
    ref:'Task',
    localField:'_id',
    foreignField:'owner'
})
userschema.set('strictPopulate', false);
    
userschema.pre('remove',async function(){
    const user = this
    await Task.deleteMany({owner:user._id})
    next()
})
const User = mongoose.model('User',userschema)
module.exports=User