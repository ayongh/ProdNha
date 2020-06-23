const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.get('/all',checkCookie, async (req, res) =>
{
    axios.get(process.env.URI+"/course/all", { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.get('/getCategorie',checkCookie, async (req, res) =>
{
    axios.get(process.env.URI+"/course/getCategorie", { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/insertCategorie',checkCookie, async (req, res) =>
{
    axios.get(process.env.URI+"/course/insertCategorie", { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/findSection/:classID',checkCookie, async (req, res) =>
{
    if(req.params.classID === undefined)
    {
        return res.status(403).send({error: "undefined ClassID"})
    }

    const classInfo = req.params.classID

    axios.get(process.env.URI+"/course/findSection/"+classInfo, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/findSection/public/:classID', async (req, res) =>
{
    if(req.params.classID === undefined)
    {
        return res.status(403).send({error: "undefined ClassID"})
    }

    const classInfo = req.params.classID

    axios.get(process.env.URI+"/course/findSection/public/"+classInfo, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/searchCourse/:categorie',checkCookie, async (req, res) =>
{
    if(req.params.categorie === undefined)
    {
        return res.status(403).send({error: "undefined categorie"})
    }
    
    const categorieinfo = req.params.categorie

    axios.get(process.env.URI+"/course/searchCourse/"+categorieinfo, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/search/:content',checkCookie, async (req, res) =>
{
    if(req.params.content === undefined)
    {
        return res.status(403).send({error: "undefined content"})
    }
    
    const contentInfo = req.params.content

    axios.get(process.env.URI+"/course/search/"+contentInfo, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.get('/search/public/:content', async (req, res) =>
{
    if(req.params.content === undefined)
    {
        return res.status(403).send({error: "undefined content"})
    }
    
    const contentInfo = req.params.content

    axios.get(process.env.URI+"/course/search/public/"+contentInfo, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


router.get('/listrating',checkCookie, async (req, res) =>
{

    axios.get(process.env.URI+"/course/listrating", { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.post('/like',checkCookie, async (req, res) =>
{
   
    axios.post(process.env.URI+"/course/like", req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});

router.post('/like/remove',checkCookie, async (req, res) =>
{
   
    axios.post(process.env.URI+"/course/like/remove", req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
});


module.exports = router;