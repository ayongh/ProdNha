const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.post('/popular',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/popular",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.post('/newlyadded',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/newlyadded",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.post('/watchHistory',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/watchHistory",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.post('/categorie',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/categorie",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});




module.exports = router;