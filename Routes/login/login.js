const router = require('express').Router();
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator');

const UserModel = require('../../Model/User/user_Model')


const loginSchema = 
[
    check('email').not().isEmpty().withMessage('Email is required').isString().withMessage('Value can not be Number').escape().isEmail().withMessage('Invalid Email address'),
    check('password').not().isEmpty().withMessage('password is required').isLength({ min: 8 }).withMessage('Invalid password, please review').isString().withMessage('Value can not be Number').escape().trim().matches(/\d/).withMessage('must contain a number')
]

router.post('/', loginSchema, async(req,res) =>
{
    const validationError = validationResult(req)

    if(!validationError.isEmpty())
    {
        var payload = {
            status:"inpute validation error",
            error: validationError
        }
        return res.status(403).send()
    }

    if(req.body.email === undefined || req.body.password === undefined)
    {
        var payload = {
            status:"inpute validation error",
            error: "Email or body needs to be defined"
        }
        return res.status(403).send()
    }

    //Finding user with the email sent in body
    const user = await UserModel.findOne({email:req.body.email})

    if(!user)
    {
        var payload = {
            status:"MongoDB error",
            error:"User with email " + req.body.email + " doesn't exist"
        }
        return res.status(403).send(payload)
    }

    //Checking Password and decryprted password
    const validatePassword = await bcrypt.compare(req.body.password, user.password)

    if(!validatePassword) 
    {
        var payload ={
            status:"Error",
            error:"user with email " + req.body.email +" password doesn't match"
        }
        return res.status(403).send(payload)
    }

    //Create and assign web token
    const token  = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: "5 days"} )

    //cookie option
    const cookieOptions = {
        httpOnly:true,
        sameSite:true,
        path:"/",
        secure:false,
        maxAge:1000*60*60*24*5,
    }

    //Successfully loges in
    var payload = {
        status:"Sucess",
        code: 200,
        login: true,
        token: token,
        message:{
            watchHistory: user.watchHistory,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }
    }

    res.cookie('authToken', token, cookieOptions).status(200).send(payload)

})



module.exports = router;

