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
app.use('/recaptcha', require ('./Routes/recaptcha'))
app.use('/token/validation', require('./Routes/token_validation'));

app.use('/user/login', require('./Routes/login'))
app.use('/user/logout', require('./Routes/logout'))
app.use('/user/info', require('./Routes/user_info'))

app.use('/recomendation',require('./Routes/recommendation'));
app.use('/render/class',require('./Routes/render_class'));
app.use('/course', require('./Routes/course'))
app.use('/user/signup', require('./Routes/signup'))



if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))

    app.get('*', (req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}


app.listen(port, console.log(`server is starting at ${port}`))