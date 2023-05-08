const RoomModel = require('../models/roomModel')
const {isValidObjectId} = require('../validations/validater')

const createRoom = async (req, res)=>{
    try{

        const hotelId = req.params.hotelId
        if(!hotelId) return res.status(400).send({status : false , message : "hotelId not in params"})
        if(isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please given valid hotelId"})

        let data = req.body
        let  { price  } = data
    
        if(!price) return res.status(400).send({status : false, message : " please Enter  price"})
        if(/^[+-]?\d+(\.\d+)?$/.test(price)) res.status(400).send({status : false, message : " please Enter valid price"})
           
        data['hotel_id'] = hotelId
        await RoomModel.create(data)
        return res.status(200).send({status : true , message : "successfully created Room "}) 

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}


const getRoom = async (req, res)=>{
    try{

        const hotelId = req.params.hotelId
        const roomId = req.params.roomId
        if(!hotelId) return res.status(400).send({status : false , message : "hotelId not in params"})
        if(isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please given valid hotelId"})
        if(!roomId) return res.status(400).send({status : false , message : "roomId not in params"})
        if(isValidObjectId(roomId)) return res.status(400).send({status : false , message : "please given valid roomId"})
       
        const roomData = await RoomModel.findOne({ hotel_id :hotelId , _id : roomId})
        if(!roomData) return res.status(404).send({status : false , message : "No room found by hotelId or roomId"})

        return res.status(200).send({status : true, data : roomData})

    }catch(err){
        return res.status(500).send({status : false , message :err.message})
    }
}

const getAllRoomByhotelId = async (req, res)=>{
    try{


        const hotelId = req.params.hotelId
        if(!hotelId) return res.status(400).send({status : false , message : "hotelId not in params"})
        if(!isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please given valid hotelId"})

        const AllRoom = await RoomModel.find({hotel_id : hotelId})
        
        return res.status(200).send({status: true , data : AllRoom})

    }catch(err){
        return res.status(500).send({status : false, message : err.message})
    }
}
const updateRoom = async (req, res)=> {
    try{
    
        let data = req.body
        const hotelId = req.params.hotelId
        const roomId = req.params.roomId
        if(!hotelId) return res.status(400).send({status : false , message : "hotelId not in params"})
        if(isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please given valid hotelId"})
        if(!roomId) return res.status(400).send({status : false , message : "roomId not in params"})
        if(isValidObjectId(roomId)) return res.status(400).send({status : false , message : "please given valid roomId"})

       const updateData =   await RoomModel.findOneAndUpdate({ hotel_id :hotelId , _id : roomId}, data , {new : true})
       if(!updateData) return res.status(404).send({status : false , message : "room not found by roomId & hotelId"})
       return res.status(200).send({status : true, message : "updated successfully" , data : updateData})

    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const deleteRoom = async (req, res)=>{

    try{

        const hotelId = req.params.hotelId
        const roomId = req.params.roomId
        if(!hotelId) return res.status(400).send({status : false , message : "hotelId not in params"})
        if(isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please given valid hotelId"})
        if(!roomId) return res.status(400).send({status : false , message : "roomId not in params"})
        if(isValidObjectId(roomId)) return res.status(400).send({status : false , message : "please given valid roomId"})

       const deletedRoom =   await RoomModel.findOneAndUpdate({ hotel_id :hotelId , _id : roomId}, data , {new : true})
       if(!deletedRoom) return res.status(404).send({status : false , message : "room not found by roomId & hotelId"})
       return res.status(200).send({status : true, message : "room deleted successfully" , data : deletedRoom})


    }catch{err}{
        return res.status(500).send({status : false , message : err.message})
    }
}

module.exports = { createRoom , getRoom , getAllRoomByhotelId , updateRoom , deleteRoom }
