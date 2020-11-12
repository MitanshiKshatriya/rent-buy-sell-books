const Book = require('../models/Books')

const getSell = (req,res,next) =>{
res.render('sell',{auth:true,user:req.user})
}

const sell = (res,req,next) =>{
    res.send("doing nothing cuurently")
}

module.exports = {
    getSell,sell
}