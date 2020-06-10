const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.post('/update/email',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/email",req.body, { validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.cookie('ueid', response.data.token,{httpOnly:true, sameSite:true, maxAge: 1000*60*60*1}).status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});

router.post('/update/emailValidation',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/info/update/email",req.body, { validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.cookie('ueid', response.data.token,{httpOnly:true, sameSite:true, maxAge: 1000*60*60*1}).status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});




module.exports = router;