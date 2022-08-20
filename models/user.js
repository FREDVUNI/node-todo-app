const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        minlength:3,
        maxlength:20,
        required:true,    
    },
    email:{
        type:String,
        minlength:3,
        maxlength:200,
        required:true,
        unique:true
    },
    password:{
        type:String,
        minlength:8,
        maxlength:1000,
        required:true
    }
})

const User = mongoose.model("users",userSchema)
module.exports = User