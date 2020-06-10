const router = require('express').Router();
const axios = require('axios');


router.post('/', async (req, res) =>
{

    axios.post(process.env.URI+"/user/login/recaptcha", req.body, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>{
        
        return res.status(response.status).send(response.data)

    })
});



module.exports = router;