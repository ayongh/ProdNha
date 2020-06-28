const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.post('/create', checkCookie,async(req,res) =>{
    axios.post(process.env.URI+"/section/create", req.body, { headers: {'Authorization': 'Bearer '+req.cookies.aid}, validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        return res.status(response.status).send(response.data)
    })
})


module.exports = router;