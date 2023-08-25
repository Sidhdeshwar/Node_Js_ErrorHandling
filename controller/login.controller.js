const jwt = require("jsonwebtoken");
const secretKey = "anySecreatKey";
const createError = require("../utilities/craeteError");
const catchError = require("./../utilities/catchError")

const checkLogin = catchError(async (req,res,next)=>{
    const bearerArray = req.headers.authorization.split(" ");
    const token = bearerArray[1];

    jwt.verify(token,secretKey,(err,tokenData)=>{
        if(err)
        {
           return next(err)
        }
        res.status(200).json({
            data: tokenData
        })
    })
});

const postUser = catchError(async (req,res,next)=>{
    jwt.sign(req.body, secretKey, {expiresIn: "600s"}, (err,token)=>{
        if(err)
        {
           return next(err)
        }
       
        res.status(200).json({
              token 
        });
    })
});

module.exports = {checkLogin,postUser};