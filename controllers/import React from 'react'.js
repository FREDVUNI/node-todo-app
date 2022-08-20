import React from 'react'
import ReactDom from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux'
import {createStore,applyMiddleware} from 'redux'
import rootReducer from './store/reducer/rootReducer'

const root = ReactDom.createRoot(document.getElementById("root"))
const store = createStore(rootReducer,(applyMiddleware(thunk)))

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App/>
        </Provider>
    </React.StrictMode> 
)

import todoReducer from './todoReducer'
import {combineReducer} from 'react-redux'

const rootReducer = combineReducer({
    todo:todoReducer
})

export default rootReducer


import {toast} from 'react-toastify'

const todoReducer = (action,state=[]) =>{
    switch(action.type){
        case "GET_ITEMS":
            return action.todo.data

        case "ADD_ITEMS":
            toast.success("Item has been added.",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            return [action.todo.data,...state]

        case "DELETE":
            toast.success("Item has been deleted.",{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            return     

        default:
            return state    
    }
}


import {axios} from "axios"
import {url} from '../url'
import {toast} from 'react-toastify'

const getItems = (todos) =>{
    return (dispatch) =>{
        axios.get(`${url}/todo`)
        .then((todos)=>{
            dispatch({
                type:"GET_ITEMS",
                todos:todos
            })
        })
        .catch((error)=>{
            toast.error(error.response?.data,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            console.log(error.response || `something went wrong.`)
        })
        
    }
}

const addItem = (todo) =>{
    return (dispatch,getState)=>{
        axios.post(`${ur}/todo`,todo)
        .then((todo)=>{
            dispatch({
                type:"ADD_ITEM",
                todo:todo
            })
        })
        .catch((error)=>{
            toast.error(error.response?.data,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
            console.log(error.response || `something went wrong.`)
        })
    }
}

const completeTodo = (id) =>{
    return (dispatch) =>{
        axios.put(`${url}/todo/${id}`)
        .then((todo)=>{
            dispatch({
                type:"COMPLETE",
                todo
            })
        })
        .catch((error)=>{
            toast.error(error.response?.data,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

const deleteTodo = (id) =>{
    return (dispatch)=>{
        axios.delete(`${url}/todo/${id}`)
        .then(()=>{
            dispatch({
                type:"DELETE",
                id
            })
        })
        .catch((error)=>{
            toast.error(error.response?.data,{
                position:toast.POSITION.BOTTOM_RIGHT
            })
        })
    }
}

const dotenv = require("dotenv")
dotenv.config({path:"config.env"})


const bcrypt = require("bcrypt")
const joi = require("joi")
const jwt = require("jwt")
const user = require("../models/user")

exports.SignIn = async (req,res)=>{
    const schema = joi.object({
        username:joi().string().max(20).min(3),
        email:joi().string().max(20).min(3).email(),
        password:joi().string().max(30).min(8)
    })

    const {error} = schema.validate(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const user = user.findOne({email:req.body.email})

    if(!user) res.status(400).send(`wrong password email combination.`)

    const validatePassword = bcrypt.compare(user.password,req.body.password)

    if(!validatePassword) res.status(400).send(`wrong password email combination.`)

    const token = jwt.sign({_id:user._id,username:user.username,email:user.email},process.env.SECRET_KEY)

    return res.status(201).send(token)
}