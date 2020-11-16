const { response } = require('express')
const Book = require('../models/Books')

const getSell = (req,res,next) =>{
res.render('sell',{auth:true,user:req.user})
}

const sell = (req,res,next) =>{

    let b1 = new Book({
        bookName:req.body.bookName,
        // option:req.body.option,
        price:req.body.price,
        // courrier:req.body.courrier,
        location:req.body.location,
        email:req.user.email,
    })
    if(req.file){
        b1.imageUrl = req.file.path
    }
    b1.save()
    .then(response=>{
        res.json({
           msg: "saved successfully!"
        })
    })
    .catch(err=>{
        res.json({
            error:err
        })
    })
    

}

const index = (req,res) => {
    Book.find({})
    .then(response=>{
        res.json({response})
    })
    .catch(err=>{
        res.json({
            error:err
        })
    })
}

module.exports = {
    getSell,sell,index
}