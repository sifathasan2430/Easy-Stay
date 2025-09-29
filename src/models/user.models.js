import mongoose, { Schema } from 'mongoose'




const userSchema=new Schema({
    username:{
        type:String,
        required:[true,'Please provide username'],
        
    },
    password:{
        type:String,
        // required:[true,'please provide password']
    },
    email:{
        type:String,
        required:[true,'Please provide username'],
       unique:true,
       match:[/.+\@.+\..+/,'gives valid email']
    },
    verifyCode:{
        type:String,
       
    
    },
      verifyCodeExpiry:{
        type:Date,
       
    
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:'user'
    }

})

const User=mongoose.models.User || mongoose.model('User',userSchema)
export default User