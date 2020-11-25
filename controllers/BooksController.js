const { response } = require('express')
const Book = require('../models/Books')

const getSell = (req,res,next) =>{
res.render('sell',{auth:true,user:req.user})
}

const sell = (req,res,next) =>{

    let b1 = new Book({
        bookName:req.body.bookName,
        author:req.body.author,
        option:req.body.rent_sell,
        price:req.body.price,
        courier:req.body.courier,
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

const filterout = (req,res,next) => {
    console.log(req.query)
    var option = req.query.option;
    if(option=="buy"){option="sell"}
    var courier = req.query.courier;
    if(option=="all" && courier=="nopref"){
        res.redirect('/search?query=')
    }
    else if(option=="all" && courier!="nopref"){
        Book.find({courier:courier})
        .then(response=>{
            res.render('filters',{books:response,query:"",filters:[option,courier],auth:true,user:req.user})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    else if(option!="all" && courier=="nopref"){
        Book.find({option:option})
        .then(response=>{
            res.render('filters',{books:response,query:"",filters:[option,courier],auth:true,user:req.user})
        })
        .catch(err=>{
            res.send(err)
        })
    }else{
        Book.find({option:option,courier:courier})
        .then(response=>{
            res.render('filters',{books:response,query:"",filters:[option,courier],auth:true,user:req.user})
        })
        .catch(err=>{
            res.send(err)
        })
    }
    
}
const search = (req,res,next) => {
    //console.log(req.query)
    var query = req.query.query.charAt(0).toUpperCase() + req.query.query.slice(1) //capitalizing
   Book.find({ "bookName":{$regex : `.*${query}.*`}})
    .then(response=>{
        
            res.render('filters',{books:response,query:query,auth:true,user:req.user})
        
    })
    .catch(err=>{
        console.log(err)
        res.render('filters',{error:err,query:query})
    })
//res.render('filters')
}

const display_book = (req,res,next) =>{
    console.log(req.query)
    Book.findOne({_id:req.query.id})
    .then(response=>{
        res.render('book',{book:response,auth:true,user:req.user})
    })
    .catch(err=>{
        res.send("some error occured!")
    })
    
} 

module.exports = {
    getSell,sell,index,filterout,search,display_book
}