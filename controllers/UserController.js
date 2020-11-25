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

const nodemailer = require('nodemailer');
const sendmail = (req,res) => {
    
    var transport = nodemailer.createTransport({
        host: "smtp.mailtrap.io",
        port: 2525,
        auth: {
          user: "21742c25669b60",
          pass: "95a3247b6ad6fc"
        }
      });
      console.log(req.body)
      const name = req.user.name
      const email = req.user.email
      const message = {
        from: 'rentbuysell@tesla.com', // Sender address
        to: 'to@email.com',  //email       // List of recipients
        subject: 'Potential Buyer for the book', // Subject line
        text: `${name} is interested in buying/renting your book. Here are the contact details: ${email}` // Plain text body
    };
    transport.sendMail(message, function(err, info) {
        if (err) {
          console.log(err)
          res.send(err)
        } else {
          console.log(info)
          res.redirect(`/book?id=${req.body.id}`)
        }
    });
}

module.exports = {
    signup,index,dashboard,sendmail
}