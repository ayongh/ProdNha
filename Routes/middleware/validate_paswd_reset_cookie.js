module.exports = async function (req, res, next)
{
    if(req.cookies.pwdRid === undefined)
    {
        return res.status(403).send({error:"undefined sighup auth cookie"})
    }  

    next()
}