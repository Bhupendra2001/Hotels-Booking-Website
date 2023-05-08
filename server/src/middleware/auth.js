const jwt = require('jsonwebtoken')
require('dotenv').config()

const verifyToken = (req,res,next) =>{
    const authHeader = req.headers['authorization'];

    if(authHeader){
        const token = authHeader.split('  ')[1];

        jwt.verify(token , process.env.Auth_key, (err, user) =>{
            if(err) res.status(403).send({status : false , message : "Token is not valid!"});
            req.user = user;
            
            next();
        })
    }else{
        return res.status(401).json("You are not authenticated!");
    }
}

const verifyTokenAndAuthorization = (req, res, next) => {

    verifyToken(req, res, ()=>{
        if(req.user.userId === req.params.userId || req.user.IsAdmin){
            next();
        }else {
          return  res.status(403).json("You are not alowed to do that!");
        }
    });

};

const verifyTokenAndAdmin = (req, res , next) => {

    verifyToken(req, res, ()=>{
       
        if(req.user.IsAdmin){
            next();
        }else{
            return res.status(403).json("you are not alowed to do that!");
        }
    })
}

module.exports = {verifyToken , verifyTokenAndAuthorization , verifyTokenAndAdmin}