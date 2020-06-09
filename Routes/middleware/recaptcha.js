const router = require('express').Router();

router.post('/', async (req, res) =>
{
    if(req.body.token === undefined)
    {
        var payload= {
            error:"Token from recaptcha is required to validate the human",
            login:false
        }
        return res.status(417).send(payload)
    }
    try {
        let APIURL = "https://www.google.com/recaptcha/api/siteverify?secret="+process.env.RECAPTCHA_SECRETKEY+"&response="+req.body.token
        axios.get(APIURL).then(response => {

            if(response.data.success && response.data.score > 0.4)
            {
                var payload = {
                    message:"successfuly verified human",
                    login:true
                }
                return res.status(200).send(payload)
            }
            else
            {
                var payload= {
                    error:"Malicious intent identified",
                    login:false
                }
                return res.status(417).send(payload)

            }
        })
    }catch(e)
    {
        var payload= {
            error:"Error caught in exception",
            login:false
        }
        return res.status(417).send(payload)
    }
})


module.exports = router;