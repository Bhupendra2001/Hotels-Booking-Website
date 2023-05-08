const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
require('dotenv').config()
const {isValidEmail , isvalidPassword ,isValidName} = require('../validations/validater')

const register = async (req, res)=>{
    try{
        let data = req.body
        let {username , email , password } = data

        if(!username) return res.status(400).send({status : false , message : "please enter username"})
        if(!isValidName(username)) return res.status(400).send({status : false , message : "please enter valid username"})
        if(!email) return res.status(400).send({status : false , message : "please enter email"})
        if(!isValidEmail(email)) return res.status(400).send({status : false , message : "please enter valid email"})
        if(!password) return res.status(400).send({status : false , message : "please enter password"})
        if(!isvalidPassword(password)) return res.status(400).send({status : false , message : "please enter  min 8 word ,max 15 word , 1 capital , 1 lower ,1 spacial char password"})


        let checkEmail = await User.findOne({email})
        if(checkEmail) return res.status(400).send({status : false , message : " users already register ?"})

        let salt = await bcrypt.genSalt(10);
        data.password = await bcrypt.hash(password , salt);
        
        
        await User.create(data)
        return res.status(201).send({status: true , message : "register successfully"})

    }catch(err){
        return res.status(500).send({ status : false ,message : err.message})
    }
}


const login = async (req, res)=> {
    try{
    
        const { email , password } = req.body
       
        if(!email) return res.status(400).send({status : false , message : "please enter email"})
        if(!isValidEmail(email)) return res.status(400).send({status : false , message : "please enter valid email"})
        if(!password) return res.status(400).send({status : false , message : "please enter password"})
        if(!isvalidPassword(password)) return res.status(400).send({status : false , message : "please enter  min 8 word ,max 15 word , 1 capital , 1 lower ,1 spacial char password"})

        let user = await User.findOne({email })
        if(!user) return res.status(404).send({status : false , message : " User not Found !"})
       
        const checkPassword = await bcrypt.compare( password, user.password)
        if(!checkPassword)  return res.status(401).send({ status: false, msg: "Password is incorrect" })
       
        
        const token = jwt.sign({ userId : user._id  , IsAdmin : user.IsAdmin }, process.env.Auth_key , {expiresIn : "3d"} )
        user._doc.Token = token

        return res.status(200).send({status : true , data : user })

    }catch(err){
        return res.status(500).send({ status : false , message : err.message})
    }
}

module.exports = {register , login}