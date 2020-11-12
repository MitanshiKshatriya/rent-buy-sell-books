const jwt = require('jsonwebtoken')

const authenticate = (req,res,next) =>{
    const token1 = req
const cookie = req.cookie

// console.log(req)
    try{
//const token = req.headers.autherization.split(' ')[1]
//const token = req.headers.autherization
// const token = req.header('Authorization').replace('Bearer ', '')
const token = req.cookies.token
const decode = jwt.verify(token,'verySecretValue')

console.log(token,decode)

req.user = decode
next()
    }
    catch(e){
        res.json({
            message: "Authentication failed!",
            err:e 
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