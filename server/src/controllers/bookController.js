const BookModel = require('../models/bookingModel')
const roomModel = require('../models/roomModel')
const hotelModel = require('../models/hotelModel')

const { isValidAddar , isValidVoterId , isValidObjectId ,isValidPanCardNumber} = require('../validations/validater')
const bookRoom = async (req, res)=>{
    try{
        let data = req.body
        
        let userId = req.params.userId
        if(!userId) return res.status(400).send({status : false , message : "Please Enter the userId in params"})
        if(!isValidObjectId(userId)) return res.status(400).send({status : false , message : "Please Enter the  valid userId in params"})
        
        let roomId = req.params.roomId
        if(!roomId) return res.status(400).send({status : false , message : "Please Enter the roomid in params"})
        if(!isValidObjectId(roomId)) return res.status(400).send({status : false , message : "Please Enter the  valid roomid in params"})
        
        const hotelId = req.params.hotelId
        if(!hotelId) return res.status(400).send({status : false , message : "Please Enter the hotelId in params"})
        if(!isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "Please Enter the  valid hotelId in params"})


        let { cust_name , address , id_proof , uid , booked_from , booked_to  } = data

        if(!cust_name) return res.status(400).send({status : false , message : "please enter the cust_name"})
        if(!address) return res.status(400).send({status : false , message : "please enter the address"})
        if(!id_proof) return res.status(400).send({status : false , message : "please enter the id_proof"})
        if(!uid) return res.status(400).send({status : false , message : "please enter the uid"})
        if(!booked_from) return res.status(400).send({status : false , message : "please enter the booked_from "})
        if(!booked_to) return res.status(400).send({status : false , message : "please enter the booked_to"})
      
        if(id_proof === 'aadhar')
        if(!isValidAddar(uid)) return res.status(400).send({status : false , message : "please enter the valid aadhar id"})
        if(id_proof === 'voter_id')
        if(!isValidVoterId(uid)) return res.status(400).send({status : false , message : "please enter the valid  voter id"})
        if(id_proof === 'pan_card')
        if(!isValidPanCardNumber(uid)) return res.status(400).send({status : false , message : "please enter the valid  pan_card id"})

         data['booked_at'] =  new Date() 
        
        data['userId'] = userId
       
           await hotelModel.findByIdAndUpdate(hotelId, { $inc: { roomsAvailableCount: -1 } }, {new : true})
        
        let  bookedData = await BookModel.create(data)

        await roomModel.findByIdAndUpdate(roomId, {$set : {info : bookedData , status : 'booked'}} , {new : true})

        return res.status(201).send({status : true, data : bookedData})

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const updatebookedRoom = async (req, res)=>{
    try{
        
        let data = req.body
        console.log(data)
        const bookRoomId = req.params.bookedId
        if(!bookRoomId) return res.status(400).send({status : false , message : "Please provide the bookRoomid in params"})
        if(!isValidObjectId(bookRoomId)) return res.status(400).send({status : false , message : "Please provide the  valid bookRoomid in params"})
        const roomId = req.params.roomId
        if(!roomId) return res.status(400).send({status : false , message : "Please Enter the Roomid in params"})
        if(!isValidObjectId(roomId)) return res.status(400).send({status : false , message : "Please Enter the  valid Roomid in params"})
        
        const updateData =  {
            cust_name : data.custName ,
            address : data.address,
            id_proof : data.idProof,
            uid : data.uid,
            booked_from : data.bookedFrom,
            booked_to : data.bookedTo,
            booked_at : new Date()
        }

        const updatebookedRoomData = await BookModel.findByIdAndUpdate(bookRoomId,  updateData, {new : true});
        if(!updatebookedRoomData) return res.status(404).send({status : false , message : "bookedData not found by given bookRoomId"})
       // console.log(updatebookedRoomData)
        await roomModel.findByIdAndUpdate(roomId , {$set : { info : updatebookedRoomData } }, {new : true})

        return  res.status(200).send({status : true , message : "Successfully updated bookedRoomData"})

    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const deleteBookedRoom = async (req, res)=>{
    try{

        const bookRoomId = req.params.bookedId
        if(!bookRoomId) return res.status(400).send({status : false , message : "Please provide the bookRoomid in params"})
        if(!isValidObjectId(bookRoomId)) return res.status(400).send({status : false , message : "Please provide the  valid bookRoomid in params"})
        
        const hotelId = req.params.hotelId
        if(!hotelId) return res.status(400).send({status : false , message : "Please provide the hotelId in params"})
        if(!isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "Please provide the  valid hotelId in params"})
        
        
        const roomId = req.params.roomId
        if(!roomId) return res.status(400).send({status : false , message : "Please Enter the Roomid in params"})
        if(!isValidObjectId(roomId)) return res.status(400).send({status : false , message : "Please Enter the  valid Roomid in params"})

        let deletedBookedRoom = await BookModel.findByIdAndDelete(bookRoomId )

        if(!deletedBookedRoom) return res.status(404).send({status : false , message : "No data found by given bookedRoomId"})

        const updateRoomData = await roomModel.findByIdAndUpdate(roomId ,  {info : {} , status : 'vacant'}, {new : true})

        await hotelModel.findByIdAndUpdate(hotelId , { $inc : {roomsAvailableCount :  1} } , {new : true})

        
        return  res.status(200).send({status : true , message : "Successfully Deleted bookedRoomData"})

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

module.exports = { bookRoom , updatebookedRoom , deleteBookedRoom}