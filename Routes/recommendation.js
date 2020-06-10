const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.post('/collaborative',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/recomendation/collaborative",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.post('/content',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/recomendation/collaborative",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


module.exports = router;