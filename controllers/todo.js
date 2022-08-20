const Todo = require("../models/todo")
const joi = require("joi")

exports.items = async(req,res) =>{
     try{
        const items = await Todo.find()
        //sort either descending or ascending order --basically help to filter the query
        .sort({date:-1})
        // .limit(10)
        const filterTodo = items.filter((item)  => item.uid === req.user._id)

        return res.status(201).json(filterTodo)
    }
    catch(error){
        console.log(error.message)
        return res.status(500).json(error.message || `There was a server error.`)
    }
}

exports.addTodo = async (req,res) =>{
    try{
        const schema = joi.object({
            name:joi.string().min(3).max(200).required(),
            author:joi.string().min(3).max(200).required(),
            uid:joi.string(),
            isComplete:joi.boolean(), 
            date:joi.date(), 
        })
        const { error } = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const {name,author,isComplete,date,uid} = req.body

        const items = await new Todo({
            name,
            author,
            isComplete,
            date,
            uid
        })

        const todo = await items.save()
        res.status(201).json(todo)
    }
    catch(error){  
        console.log(error.message)
        return res.status(500).json(error.message || 'something went wrong')
    }
}
exports.updateTodo = async(req,res)=>{
    try{
        const schema = joi.object({
            name:joi.string().min(3).max(200).required(),
            author:joi.string().min(3).max(200).required(),
            uid:joi.string(),
            isComplete:joi.boolean(),
            date:joi.date(), 
        })
        const { error } = schema.validate(req.body)
        if(error) return res.status(400).send(error.details[0].message)

        const todo = await Todo.findById(req.params.id)
        if(!todo) return res.status(404).send("The item was not found.")

        if(todo.uid !== req.user._id) return res.status(401).send("You're not authorized.")

        const {name,author,isComplete,date,uid} = req.body 

        //because the objects are similar to the value pairs.
        const updateTodo = await Todo.findByIdAndUpdate(req.params.id,{
            name,
            author,
            isComplete, 
            date,
            uid
        },{new:true})
        return res.status(201).json(updateTodo)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json(error.message || "There was a server error.")
    }
}
exports.completeTodo = async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        if(!todo) return res.status(404).send("The item was not found.")

        if(todo.uid !== req.user._id) return res.status(401).send("You're not authorized.")

        const completeTodo = await Todo.findByIdAndUpdate(req.params.id,{
            isComplete :!todo.isComplete,
        },{new:true});
        res.status(201).json(completeTodo)

    }catch(error){
        console.log(error.message)
        res.status(500).json(error.message || "There was a server error.")
    }
}
exports.deleteTodo = async(req,res)=>{
    try{
        const todo = await Todo.findById(req.params.id)
        if(!todo) return res.status(404).send("The item was not found.")

        if(todo.uid !== req.user._id) return res.status(401).send("You're not authorized.")

        const deleteTodo = await Todo.findByIdAndDelete(req.params.id)
        return res.status(201).json(deleteTodo)
    }
    catch(error){
        console.log(error.message)
        res.status(500).json(error.message || "There was a server error.")
    }
}
