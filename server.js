const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

//Holds the important Enviroment Variable for local
const dotenv = require('dotenv')
dotenv.config();

const app = express()

//Import Route Modules 
const user_login = require('../nhaProd/Routes/login/login')
const Recaptcha = require ('../nhaProd/Routes/middleware/recaptcha')

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

//Routess
app.use('/recaptcha',Recaptcha)
app.use('/user/login',user_login)

app.get('/test',(req,res)=>
{
    return res.status(200).send({message: "hello"})
})


// if(process.env.NODE_ENV === 'production')
// {
//     app.use(express.static('client/build'))
// }

app.listen(port, console.log(`server is starting at ${port}`))