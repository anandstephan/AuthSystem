import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    name:{
        type:String,
        required:[true,"Please provide a username"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    },
    email:{
        type:String,
        required:[true,"Please provide an email"],
        unique:true
    },
    isVerified:{
        type:Boolean,
        default:false
    },
    isAdmin:{
        type:Boolean,
        default:false
    },
    forgotPasswordToken:String,
    forgotPasswordTokenExpiry:Date,
    verifiedToken:String,
    verifiedTokenExpiry:Date
})

const User = mongoose.models.users || mongoose.model("users",userSchema)


export default User