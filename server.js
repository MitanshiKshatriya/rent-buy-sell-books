const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

/**
 * adding routes
 */
const UserRoute = require('./routes/UserRoute')

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

/** enabling form / json posts */

/*middlewares dealing with frontend*/

app.set('views',path.join(__dirname,'views'))
app.set('view engine','ejs')

const middlewares = [
    express.static(path.join(__dirname,'static')),
]
app.use(middlewares)

/*middlewares dealing with frontend*/



app.get('/',function(req,res){
res.render("home")
})

app.get('/login',function(req,res){
    res.render("login")
})

app.get('/signup',function(req,res){
    res.render("signup")
})

app.use('/',UserRoute)

app.post('/fuckmylife',function(req,res){
    console.log(req.body)
    res.send("fuck")
})

app.listen(PORT,function(){
    console.log(`listening at ${PORT}`)
})

