const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const multer = require('multer')
const route = require('./routes/router')
require('dotenv').config()
const app = express()

app.use(express.json())
app.use(cors())
app.use(multer().any())

mongoose.connect(process.env.MongoURL , {useNewUrlParser : true})
.then(()=>console.log(" mongodb is conected "))
.catch((err)=>console.log(err))

app.use('/api', route)

app.listen(process.env.PORT , ()=>{
    console.log(" hotal management server is started in port "+ process.env.PORT)
})
