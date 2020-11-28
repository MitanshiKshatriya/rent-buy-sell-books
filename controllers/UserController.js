const { response } = require('express');
const User = require('../models/User')
const Book = require('../models/Books')
const nodemailer = require('nodemailer');



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
    Book.find({email:req.user.email})
    .then(response=>{
        res.render('dashboard',{books:response,user:req.user,auth:true})
    })
    .catch(err=>{
        res.send(err)
    })
    
    
}


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
          //res.redirect(`/book?id=${req.body.id}`)
          res.render('success',{msg:"Your contact has been succesfully sent! We hope you are contacted soon!",
          auth:true,user:req.user})
        }
    });
}
const delete_book = (req,res,next)=>{
//res.send(req.body)
//
Book.findByIdAndDelete(req.body.id)
.then(response=>{
    console.log(response)
    res.render('success',{msg:"Your listing has been successfully deleted",
          auth:true,user:req.user})
})
.catch(err=>{
    res.send(err)
})
}
const get_edit_book = (req,res,next)=>{
    //console.log(req.query.id)
    Book.findOne({_id:req.query.id})
    .then(response=>{
        res.render('edit',{auth:true,user:req.user,book:response})
    })
    .catch(err=>{
        res.send(err)
    })
    
}
const post_edit_book = (req,res,next) =>{
    console.log("req.body=",req.body)
    var updateData = {
        bookName:req.body.bookName,
        author:req.body.author,
        option:req.body.rent_sell,
        price:req.body.price,
        courier:req.body.courier,
        location:req.body.location,

    }
    Book.findOneAndUpdate({_id:req.body.id},
        {$set:updateData})
        .then(()=>{
            //res.redirect('/dashboard')
            res.render('success',{msg:"Book updated successfully!",auth:true,user:req.user})
        })
        .catch(err=>{
            res.send(err)
        })
}

module.exports = {
    index,dashboard,sendmail,delete_book,get_edit_book,post_edit_book
}