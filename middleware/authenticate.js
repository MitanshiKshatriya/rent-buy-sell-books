const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) =>{


    try{

const token = req.cookies.token
const decode = jwt.verify(token,'verySecretValue')

//console.log(token,decode)

req.user = decode
next()
    }
    catch(e){
        
res.redirect("/home")
    }
}

module.exports = authenticate