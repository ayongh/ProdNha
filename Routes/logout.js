const router = require('express').Router();
const axios = require('axios');


router.get('/', async (req, res) =>
{
    axios.get(process.env.URI+'/user/logout', {validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response =>{
        if(response.status === 200)
        {
            return res.clearCookie('aid').status(response.status).send(response.data)
        }

        return res.status(response.status).send(response.data)
    })
  
});



module.exports = router;