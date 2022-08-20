//400 a client error 500 a server error
const joi = require("joi")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const User = require("../models/user")

exports.signUp = async(req,res)=>{
    const schema = joi.object({
        name:joi.string().max(200).min(3).required(),
        email:joi.string().max(200).min(3).email().required(),
        password:joi.string().max(200).min(3).required(),
    })
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message) 

    try{
        let user = await User.findOne({email: req.body.email})

        if(user) return res.status(400).json(`user with email ${req.body.email} already exists.`)

        //salt & hash
        let salt = await bcrypt.genSalt(10)
        let hashed = await bcrypt.hash(req.body.password,salt)

        let newUser = await new User({
            name:req.body.name,
            email:req.body.email,
            password:hashed
        }) 
        await newUser.save()
        const token = jwt.sign(
            { _id:newUser._id,name:newUser.name,email:newUser.email},
            process.env.SECRET_KEY
        )
        res.send(token)
    }
    catch(error){
        return res.status(500).json(error.message || `There was a server problem.`)
    }
}

exports.signIn = async(req,res)=>{
    try{
        const schema =  joi.object({
            email:joi.string().max(200).min(3).email().required(),
            password:joi.string().max(200).min(3).required(),
        })
        const { error } = schema.validate(req.body)
        if(error) res.status(400).send(error.details[0].message)

        //check if user exists
        let user = await User.findOne({email:req.body.email})
        if(!user) return res.status(400).json(`Invalid email or password.`)

        let validPassword = await bcrypt.compare(req.body.password,user.password)

        if(!validPassword) return res.status(400).json(`Invalid email or password.`)

        const token = jwt.sign(
            {_id:user._id,name:user.name,email:user.email},
            process.env.SECRET_KEY
        )
        res.send(token)
    }
    catch(error){
        return res.status(500).json(error.message || `There was a server error.`)
    }
}