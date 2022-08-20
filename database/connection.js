const mongoose = require("mongoose")

const connectDB = async () =>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URI,{
            useUnifiedTopology:true,
            // useFindAndModify:false,
            useNewUrlParser:true,
            // useCreateIndex:true 
        })
    }
    catch(error){
        console.log(error.message || `something went wrong.`)
        process.exit(1)
    }
}

module.exports = connectDB