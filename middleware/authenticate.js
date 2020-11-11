const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) =>{
    try{
//const token = req.headers.autherization.split(' ')[1]
//const token = req.headers.autherization
const token = req.header('Authorization').replace('Bearer ', '')
const decode = jwt.verify(token,'verySecretValue')

req.user = decode
next()
    }
    catch{
        res.json({
            message: "Authentication failed!"
        })

    }
}

/**
 * 
 * {
    "name":"mitanshi",
    "email":"mitanshi@gmail.com",
    "phone":"7903948515",
    "password":"hojachutiye"
}
 * 
 */


module.exports = authenticate