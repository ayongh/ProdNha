module.exports = async function (req, res, next)
{
    if(req.cookies.ueid === undefined)
    {
        return res.status(403).send({error:"undefined email auth cookie"})
    }  

    next()
}