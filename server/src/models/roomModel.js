const mongoose = require('mongoose')

const RoomSchema = new mongoose.Schema({
   
    hotel_id : {type : mongoose.Schema.Types.ObjectId , ref : 'Hotel', required : true},
    price : {type : Number , required : true},
    status : {type : String , enum : ['booked','vacant'], required : true , default : 'vacant'},
    info : {type : Object , default : {}}

},{timestamps : true})

module.exports = mongoose.model('Room', RoomSchema)

