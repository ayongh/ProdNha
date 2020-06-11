const express = require('express')
const morgan = require('morgan')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
var cookieParser = require('cookie-parser'); //under obesrvation


//Holds the important Enviroment Variable for local
const dotenv = require('dotenv')
dotenv.config();

const app = express()

//Import Route Modules 
const user_Login = require('./Routes/login')
const Recaptcha = require ('./Routes/recaptcha')
const token_Validation = require('./Routes/token_validation')
const Recomendation = require('./Routes/recommendation')
const render_Class = require('./Routes/render_class')
const Course = require('./Routes/course')
const user_info = require('./Routes/user_info')
//SWGGER Documentaion Hold


//Port being used during production or local
const port = process.env.PORT || 8080

//http request logger for terminal for us to see

app.use(morgan('tiny'))
app.use(express.json())
app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

//Routess
app.use('/recaptcha',Recaptcha)
app.use('/user/login',user_Login)
app.use('/token/validation', token_Validation);
app.use('/recomendation',Recomendation);
app.use('/render/class',render_Class);
app.use('/course', Course)
app.use('/user/info', user_info)


app.listen(port, console.log(`server is starting at ${port}`))