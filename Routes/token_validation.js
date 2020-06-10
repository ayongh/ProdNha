const router = require('express').Router();
const axios = require('axios');

const checkCookie = require('./middleware/validate_Login_Cookie')

router.get('/',checkCookie, async (req, res) =>
{
  
    await axios.get(process.env.URI+"/token/validation", {
        headers: {
            'Authorization': 'Bearer '+req.cookies.aid
        },

        validateStatus: function (status) { return status >= 200 && status < 600; }}).then(response=>
        {
            console.log(response.data)
            return res.status(response.status).send(response.data)
        }
    ).catch(e =>{
        return res.status(500).send({error:"token validation failed hit token validation"})

    })
});


module.exports = router;