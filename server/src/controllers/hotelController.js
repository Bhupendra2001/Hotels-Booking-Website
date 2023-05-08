
const HotelModel = require('../models/hotelModel')
const { isValidObjectId , isValidImg} = require('../validations/validater')
const {uploadFile} = require('../aws')
const createHotel = async (req, res)=>{
    try{

    let data = req.body
    if(Object.keys(data).length == 0) return  res.status(400).send("please provide hotel details")
    
    
    let hotelPic = req.files
    
    if(!hotelPic[0])return res.status(400).send({status : false, message : "please provide hotelPic"})
    if (!isValidImg(hotelPic[0].originalname)){ return res.status(400).send({ status: false, message: "Image Should be of JPEG/ JPG/ PNG", }) }
    data['hotel_img'] = await uploadFile(hotelPic[0])

    let {  title , city , address , stars , facilities , roomsAvailableCount   } = data
    
    if(!title) return res.status(400).send("Please provide title")
    if(!city) return res.status(400).send("Please provide city")
    if(!address) return res.status(400).send("Please provide address")
    if(!stars) return res.status(400).send("Please provide stars")
    if(!facilities) return res.status(400).send("Please provide  facilities")
    if(!roomsAvailableCount) return res.status(400).send("please provide hotel_uid")
    if(![1,2,3,4,5].includes(Number(stars)))  return res.status(400).send("Please Enter valid  stars")
    const hotel_uid = Math.floor(Math.random() * 1000000);
    data['hotel_uid'] = hotel_uid

    if(facilities.includes('  ')){
        let temp = facilities.split('  ')
        const arr = temp.map(x=>x.trim()).filter(y=> y.length != 0 &&  !y.includes('  ')).map(z=> z.toLowerCase())
       const result = [... new Set(arr)]
       data.facilities = result
    }

    await HotelModel.create(data)

    return res.status(201).send({status : true, message : "hotel successfully created"})
    }
    catch(err){
        return res.status(500).send({status : false , message : err.message})
    }

}


const getAllHotel = async (req, res)=>{
    try{
        let filters = req.query
        
        let  hotelData ;

        if(Object.keys(filters).length == 0) 
        hotelData =  await HotelModel.find() 
         else 
        hotelData = await HotelModel.find(filters)
        return res.status(200).send({status : true, data : hotelData})
    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const getHotel = async (req, res)=>{

    try{
        let hotelId = req.params.id
        if(!hotelId) return res.status(400).send({status : false , message : "please give me hotelId"})
        if(!isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please give me valid hotelId"})


        const Data = await HotelModel.findById({_id : hotelId})
        return res.status(200).send({status : true, data : Data})
    }catch(err){
        return res.status(500).send({status : false , message : err.message})
    }
}

const updateHotel = async (req, res)=> {
    try{

        let hotelId = req.params.id
        if(!hotelId) return res.status(400).send({status : false , message : "please give me hotelId"})
        if(!isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please give me valid hotelId"})

        const updatedData = await HotelModel.findByIdAndUpdate(hotelId, req.body , {new : true})
        return res.status(200).send({status :  true , data : updatedData})

    }catch(err){
    return res.status(500).send({status : false , message : err.message})
    }
}

const deleteHotel = async (req, res)=>{

    try{
        let hotelId = req.params.id

        if(!hotelId) return res.status(400).send({status : false , message : "please give me hotelId"})
        if(isValidObjectId(hotelId)) return res.status(400).send({status : false , message : "please give me valid hotelId"})

        let hotel =  await HotelModel.findByIdAndDelete({hotelId})
        if(!hotel) return  res.status(400).send({status : false , message : "hotel not found by given hotelId"})

        return res.status(200).send({status : true , message : "hotel deleted successfully"})
       }catch(err){
        return res.status(500).send({status : false , message : err.message})
      }
}


module.exports = { createHotel , deleteHotel , getAllHotel , getHotel ,updateHotel}