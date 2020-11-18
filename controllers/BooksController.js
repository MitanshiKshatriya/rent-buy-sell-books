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
    console.log(req.body)
res.render('filters')
}
const search = (req,res,next) => {
    //console.log(req.query)
    var query = req.query.query.charAt(0).toUpperCase() + req.query.query.slice(1) //capitalizing
   Book.find({ "bookName":{$regex : `.*${query}.*`}})
    .then(response=>{
        if(response.length>0){
            //console.log("response = ",response)
            res.render('filters',{books:response,query:query})
        }else{
            //console.log("didnt show response = ",response)
            res.render('filters',{query:query})
        }
    })
    .catch(err=>{
        console.log(err)
        res.render('filters',{error:err,query:query})
    })
//res.render('filters')
}

module.exports = {
    getSell,sell,index,filterout,search
}