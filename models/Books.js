const mongoose = require('mongoose')
const Schema = mongoose.Schema

const bookSchema = new Schema({
    bookName:{
        type:String
    },
    author:{
type:String
    },
    imageUrl:{
        type:String
    },
    option:{
        //rent or sell
        type:String
    },
    price:{
        type:Number
    },
    courrier:{
        type:Boolean
    },
    location:{
        type:String
    },
    email:{
        type:String
    }
}) 

const Book = mongoose.model('Book',bookSchema)

module.exports = Book