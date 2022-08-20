const mongoose = require("mongoose")

const todoSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:3,
        maxlength:200
    },
    author:{
        type:String,
        required:true,
    },
    uid:{  
        type:String
    },
    isComplete:{
        type:Boolean,
        default:false
    },
    date:{
        type:Date,
        default:new Date(),
    }
})

const Todo = mongoose.model('items',todoSchema)

module.exports = Todo

