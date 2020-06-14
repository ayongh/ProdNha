const router = require('express').Router();
const axios = require('axios');

const signupverify  = require('../Routes/middleware/validate_email_signup_cookie')

router.post('/', signupverify, async (req, res) =>
{
    axios.post(process.env.URI+'/user/signup', req.body, { headers: {'Authorization': 'Bearer '+req.cookies.suid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response =>{
        if(response.status === 200)
        {
            return res.clearCookie('suid').cookie('aid', response.data.loginToken,{httpOnly:true, sameSite:true, maxAge:432000000}).status(response.status).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
  
});



router.post('/emailvarification', async (req, res) =>
{
    axios.post(process.env.URI+'/user/signup/emailvarification', req.body, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response =>{

        if(response.status === 200)
        {
            return res.cookie('suid', response.data.token,{httpOnly:true, sameSite:true, maxAge:86400000 }).status(response.status).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
  
});




module.exports = router;