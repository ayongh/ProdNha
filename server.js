const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const path = require('path')

const app = express()


const port = process.env.PORT || 8080

//http request logger for terminal for us to see
app.use(morgan('tiny'))
app.use(express.json())
app.use(express.urlencoded({extended:false}))


app.get('/test', (req, res) =>{
    const data = {
        message:"Test Server"
    }

    res.cookie('test','AbhishekCookie',{httpOnly:true, maxAge: 1000*60*60*5}).status(200).send(data)
})

if(process.env.NODE_ENV === 'production')
{
    app.use(express.static('client/build'))
}

app.listen(port, console.log(`server is starting at ${port}`))