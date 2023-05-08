const mongoose = require('mongoose')

const bookedSchema = new mongoose.Schema({

    cust_name : { type : String , required : true},
    address : {type : String , required : true},
    id_proof : { type : String , enum : ["aadhar", "voter_id", "pan_card"] ,required : true , },
    uid : { type : String , required : true},
    booked_from : {type : Date},
    booked_to : {type : Date},
    booked_at : {type : Date},
    userId : {type : mongoose.Schema.Types.ObjectId , required : true }
}, {timestamps : true})

module.exports = mongoose.model('booking', bookedSchema)


