module.exports = async function (req, res, next)
{
    if(req.cookies.suid === undefined)
    {
        return res.status(403).send({error:"undefined sighup auth cookie"})
    }  

    next()
}