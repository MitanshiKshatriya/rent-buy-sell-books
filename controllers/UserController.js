const { response } = require('express');
const User = require('../models/User')


const signup = (req,res) =>{

    console.log(req.body);

    // { name: 'what', email: 'my@my.com', tel: '7903948515', password: '' }
  var u1 = new User({
      name:req.body.name,
      email:req.body.email,
      phone:req.body.tel,
      password:req.body.password
  })

  u1.save()
  .then(response=>{
      res.send("registered successfully!")
  })
  .catch(err=>{
      res.send(`some error occured!-${err}`)
  })



}

const index =(req,res) =>{
    User.find({})
    .then(response=>{
        res.send(response)
    })
    .catch(err=>{
        res.send(err)
    })
}

const dashboard = (req,res)=>{
    res.send("this is ur dashbpard u are looged in!")
}

module.exports = {
    signup,index,dashboard
}