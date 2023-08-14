const jwt = require('jsonwebtoken')
const User = require('../src/models/user')

const auth = async (req,res,next) => {
    try{
        const token = req.header('Authorization')
        const decoded = jwt.verify(token,'thisismynewtoken')
        // console.log(decoded)//{ _id: '64d9f1e2efe277efb77c1f8d', iat: 1692004834, exp: 1692609634 }
        const user = await User.findOne({_id:decoded._id,'tokens.token':token})
        if(!user){
            throw new Error('err')
        }
        req.token = token
        req.user = user
        
        next()
        // console.log(token)
    }
    catch(e){
        res.status(401).send({error:'please authenticate'})
    }
    
}
module.exports = auth