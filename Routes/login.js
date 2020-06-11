const router = require('express').Router();
const axios = require('axios');


router.post('/', async (req, res) =>
{
    axios.post(process.env.URI+'/user/login', req.body, {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response =>{
        if(response.status === 200)
        {
            return res.cookie('aid', response.data.token,{httpOnly:true, sameSite:true, maxAge:432000000}).status(response.status).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
  
});



module.exports = router;