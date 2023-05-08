const mongoose = require('mongoose')


const isValidEmail = function (mail) {
    return /^[a-z0-9_]{1,}@[a-z]{3,}[.]{1}[a-z]{3,6}$/.test(mail)
    
}

const isValidName = function(username) {
    return /^[a-zA-Z\s\.]*$/.test(username)
  
}

const isValidObjectId = function (objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const isvalidPassword = function(password){
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/.test(password)
}

const isValidAddar = function(aadhar){
    return /^\d{4}\s\d{4}\s\d{4}$/.test(aadhar)
   // return /^[2-9]{1}[0-9]{3}\\s[0-9]{4}\\s[0-9]{4}$/.test(aadhar)
}

const isValidVoterId = function(voter){
    return /^[A-Z]{3}[0-9]{7}$/.test(voter)
}

const isValidPanCardNumber = function(pancard){
    return /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(pancard)
}

const isValidImg = (img) => {
    const reg = /.+\.(?:(jpg|gif|png|jpeg|jfif))/;
    return reg.test(img);
  };
  

module.exports = {isValidEmail , isValidName , isValidObjectId , isvalidPassword , isValidAddar , isValidVoterId , isValidPanCardNumber , isValidImg}