const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Holds the important Enviroment Variable for local
const dotenv = require('dotenv')
dotenv.config();

const app = express()

//SWGGER Documentaion Hold


//Port being used during production or local
const port = process.env.PORT || 8080

//http request logger for terminal for us to see

app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))


//MongoDB data connection
mongoose.connect(process.env.DB_CONNECTION, {useNewUrlParser: true, useUnifiedTopology:true}, (error) =>
{
    if(error)
    {
        return false
    }

    return true
})

app.get('/test', (req, res) =>{
    const data = {
        message:"Test Server"
    }

    res.cookie('test','AbhishekCookie',{httpOnly:true, maxAge: 1000*60*60*5, sameSite:true}).status(200).send(data)
})


app.get('/getcookie', (req,res)=>
{
    console.log()
})

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}

app.listen(port, console.log(`server is starting at ${port}`))