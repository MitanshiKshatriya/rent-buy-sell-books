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
            // res.json({
            //     message: "user added Succesfully"
            // })
           
            res.redirect('/register')
        })
        .catch(error =>{
            res.json({
                messgae:'An error has occured'
            })
        })
    })

    
}




const login = (req,res,next) => {
    var email = req.body.email
    var password = req.body.password

    User.findOne({$or: [{email:email},{phone:email}]})
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
                    let token = jwt.sign({name: user.name,email:user.email}, 'verySecretValue',{expiresIn: '24h'})
                    // res.json({
                    //     message:"login siuccessful!",
                    //     token
                    // })
                    res.cookie('token', token);
                   // res.send(`set token = ${token}`)
                   res.redirect('/')
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

const logout = (req,res) =>{
    res.clearCookie('token')
    res.redirect('/')

}

const getRegister = (req,res) =>{
    // res.render('signup',{message: req.flash('notify') })
    res.render('signup')
}

module.exports = {
    register,login,getLogin,logout,getRegister
}