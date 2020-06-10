module.exports = async function (req, res, next)
{
    if(req.cookies.aid === undefined)
    {
        return res.status(403).send({error:"undefined authtoken in the cookie"})
    }  

    next()
}