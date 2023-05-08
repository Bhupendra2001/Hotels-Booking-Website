const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    username : { type :String , required : true },
    email : {type : String , required : true, unique : true},
    password : {type : String , required : true , min : 8 , max : 15},
    IsAdmin : {type : Boolean, default : false}
    
},{timestamps : true})

module.exports = mongoose.model('User', userSchema)