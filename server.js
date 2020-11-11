const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const PORT = process.env.PORT || 3000 

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

app.listen(PORT,function(){
    console.log(`listening at ${PORT}`)
})

