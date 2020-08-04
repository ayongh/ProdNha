const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.post('/popular',checkCookie, async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/popular",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.post('/newlyadded', async (req, res) =>
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


router.post('/categorie', async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/categorie",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.post('/popular/public', async (req, res) =>
{
    axios.post(process.env.URI+"/render/class/popular/public",req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.post('/all/public', async (req, res) =>
{
    console.log("hello from all")
    axios.post(process.env.URI+"/render/class/all/public",req.body, { validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});



module.exports = router;