const jwt = require("jsonwebtoken")

const auth = (req,res,next) =>{
    const token = req.header("x-auth-token")
    if(!token) return res.status(401).send("You are not authorized.")
    
    try{
        const payload = jwt.verify(token,process.env.SECRET_KEY)
        req.user = payload
        next() 
    }
    catch(error){
        res.status(400).send(`The token is invalid.`|| error.message) 
    }
}
module.exports = auth