const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv').config()
const mongoose = require("mongoose")
const authControllers = require('./controllers/authControllers')
const productControllers = require('./controllers/productControllers')
const uploadControllers = require('./controllers/uploadControllers')
const app = express()

//connect our db 
mongoose.set('strictQuery', false)
mongoose.connect(process.env.MONGO_URL, () =>console.log ('DB is successfully connected'))

//routers & middlewares
// those two middlewars make req.body accessible, otherwise it would be undefined 
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use('/images', express.static('public/images'))
app.use('/auth', authControllers)
app.use('/product', productControllers)
app.use('/upload', uploadControllers)

// start our server 
app.listen(process.env.PORT, () => console.log ('Server has been started successfully'))


// server is on port 8080, client is on port 3000, we are going to get cors error,but cors remove that error