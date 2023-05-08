const mongoose = require('mongoose')


const hotelSchema = new mongoose.Schema({
    hotel_img : { type : String, require : true},
    hotel_uid : {type : Number, required : true, uniqe : true},
    title : { type :String , required : true},
    city : {type : String , required : true},
    address : {type : String , required : true},
    stars : {type : Number , min : 1, max : 5, required : true},
    facilities : {type : [String], required : true },
    IsVacantRoom : {type : Boolean, default : true},
    roomsAvailableCount : { type : Number , required : true , default : 0 }
},{timestamps : true})



module.exports = mongoose.model('Hotel', hotelSchema)