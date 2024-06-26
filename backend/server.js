//Like Importing from .env
require('dotenv').config()

//Like importing Express
const express = require('express')

//import Mongoose
const Mongoose = require('mongoose')

//importing workouts
const grievanceRoutes = require('./routes/grievances')
const adminRoutes = require('./routes/admin')

//express app
const app = express()

//middleware
//The middleware in node. js is a function that will have all the access for requesting an object, responding to an object, and moving to the next middleware function in the application request-response cycle.
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/grievances', grievanceRoutes)
app.use('/api/admin', adminRoutes)

//Connect to DB
Mongoose.connect(process.env.MONG_URI)
    .then(() => {
        app.listen(process.env.PORT, ()=>{
            console.log("Connected to DB & Listening to port")
        })
    })
    .catch((error) => {
        console.log(error)
    })

//listen for Request
// app.listen(process.env.PORT, ()=>{
//     console.log("Listening to port")
// })