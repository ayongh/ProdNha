const router = require('express').Router();
const axios = require('axios');

const checkpswdResetCookie = require('./middleware/validate_paswd_reset_cookie')

router.post('/', async (req, res) =>
{
    axios.post(process.env.URI+"/user/pswdReset",req.body, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.cookie('pwdRid', response.data.token,{httpOnly:true, sameSite:true, maxAge: 1000*60*60*1}).status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});

router.post('/confirmation',checkpswdResetCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/pswdReset/confirmation",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.pwdRid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});

router.post('/updatePswd',checkpswdResetCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/user/pswdReset/updatePswd",req.body, {headers: {'Authorization': 'Bearer '+req.cookies.pwdRid},validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        if(response.status === 200)
        {
            return res.clearCookie('pwdRid').status(200).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
});



module.exports = router;