const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userschema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            lowercase:true,
            index:{
                unique:true
            },
            unique:true,
            validate(val){
                if(!validator.isEmail(val)){
                    throw new Error('Not valid')
                }
            }
        },
        password:{
            type:String,
            required:true,
            minlength: 2,
            trim:true,
            index:{
                unique:true
            },
            unique:true,
            validate(val){
                if(val.toLowerCase().includes("pass")){
                    throw new Error('Not valid PASS')
                }
                User.findOne({email:val}).then((res)=>{
                    console.log(res)
                })
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
    console.log(user._id.toString())
    const token = await jwt.sign({_id:user._id.toString()},'thisismynewtoken', {expiresIn:'7 days'})
    console.log(token)
    user.tokens = user.tokens.concat({ token })
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