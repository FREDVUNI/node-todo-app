const express = require("express")
const morgan = require("morgan")
const dotenv = require("dotenv")
const cors = require("cors")
const connectDB = require("./database/connection")

const app = express()
app.use(morgan("tiny"))

//middleware
app.use(cors())

app.use(express.urlencoded({extended:true}))
app.use(express.json())

dotenv.config({path:'env.config'})

const PORT = process.env.PORT || 8080

app.use("/api/todo",require("./routes/todo"))
app.use("/api/user",require("./routes/user"))

connectDB()
app.listen(PORT,()=>{
    console.log(`server started on port http://localhost:${PORT}`)
})