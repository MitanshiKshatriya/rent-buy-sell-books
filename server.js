const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const cookieParser = require('cookie-parser')


const app = express()

/**
 * adding routes
 */
const UserRoute = require('./routes/UserRoute')
const AuthRoute = require('./routes/AuthRoute')
const BookRoute = require('./routes/BooksRoutes')
const authenticate = require('./middleware/authenticate')
const Book = require('./models/Books')

const PORT = process.env.PORT || 3000 

/* connecting with mongodb */
var url = 'mongodb://urmika:urmika@cluster0-shard-00-00.ju3qn.mongodb.net:27017,cluster0-shard-00-01.ju3qn.mongodb.net:27017,cluster0-shard-00-02.ju3qn.mongodb.net:27017/rentbuyselldb?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true&w=majority'

mongoose.connect(url,
{useNewUrlParser:true, 
    useUnifiedTopology:true}
)

const db = mongoose.connection;

db.on('error',(err)=>{
    console.log(err)
})

db.once('open',()=>{
    console.log("atlas db connected");
})
/**conecting with mongodb */

/** enabling form / json posts */


app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())
app.use(cookieParser());

/** enabling form / json posts */

/*middlewares dealing with frontend*/

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

const middlewares = [
    express.static(path.join(__dirname,'static')),
]
app.use(middlewares)

/*middlewares dealing with frontend*/

app.use('/uploads',express.static('uploads'))


app.get('/home',function(req,res){

    //get all the books

    Book.find({})
    .then(response=>{
        console.log(response)
        //console.log(Object.keys(response[0]._doc))
        //console.log("courier ",response[1]._doc.courier)
        res.render("home",{auth:false,books:response})
    })
    .catch(err=>{
        res.json({
            error:err
        })
    })

})


app.get('/',authenticate,function(req,res){

    Book.find({})
    .then(response=>{
        //console.log(Object.keys(response[0]._doc))
        //console.log("courier ",response[1]._doc.courier)
        res.render("home",{auth:true,user:req.user,books:response})
    })
    .catch(err=>{
        res.json({
            error:err
        })
    })
    
    

})




app.use('/',AuthRoute)

app.use('/',UserRoute)

app.use('/',BookRoute)

app.post('/fuckmylife',function(req,res){
    console.log(req.body)
    res.send("fuck")
})

app.listen(PORT,function(){
    console.log(`listening at ${PORT}`)
})

