const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')
const checkemailupdateCookie = require('./middleware/validate_email_update_cookie')

router.post('/update/email',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/email",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.aid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.cookie('ueid', response.data.token,{httpOnly:true, sameSite:true, maxAge: 1000*60*60*1}).status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});

router.post('/update/emailValidation',checkCookie,checkemailupdateCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/emailValidation",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.aid ,  'eAuthorization': 'Bearer '+req.cookies.ueid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.clearCookie('ueid').status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});


router.post('/update/name',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/name",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.aid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        return res.status(response.status).send(response.data)

    })
});


router.post('/update/watchLater',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/watchLater",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.aid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        return res.status(response.status).send(response.data)

    })
});


router.post('/update/watchLater/remove',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/watchLater/remove",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.aid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        return res.status(response.status).send(response.data)

    })
});






module.exports = router;