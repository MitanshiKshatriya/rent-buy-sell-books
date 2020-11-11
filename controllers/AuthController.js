const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const register = (req,res,next) =>  {
    bcrypt.hash(req.body.password,10,(err,hashedPass)=>{
        if(err)
        {
            res.json({
                error:err
            })
        }
        let user = new User ({
            name:req.body.name,
    
            email:req.body.email,
            phone:req.body.phone,
            password:hashedPass,
        })
    
        user.save()
        .then(user=>{
            res.json({
                message: "user added Succesfully"
            })
    
        })
        .catch(error =>{
            res.json({
                messgae:'An error has occured'
            })
        })
    })

    
}




const login = (req,res,next) => {
    var username = req.body.username
    var password = req.body.password

    User.findOne({$or: [{email:username},{phone:username}]})
    .then(user=>{
        if(user)
        {
            bcrypt.compare(password,user.password,function(err,result){
                if(err)
                {
                    res.json({
                        error:err
                    })
                }
                if(result){
                    let token = jwt.sign({name: user.name}, 'verySecretValue',{expiresIn: '24h'})
                    res.json({
                        message:"login siuccessful!",
                        token
                    })
                }else{
                    res.json({
                        message: "Password does not match"
                    })
                }
            })
        }else{
            res.json({
                message: 'No user found!'
            })
        }
    })
}

const getLogin = (req,res) =>{
    res.render("login")
}

module.exports = {
    register,login,getLogin
}