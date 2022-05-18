import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'


//routes
import userRoutes from './routes/userRoutes.js'

const app = express()
dotenv.config()
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())

app.get('/', (req,res)=>{
    res.send('welcome to Sandsharks')
})

app.use('/user', userRoutes)

const MONGODB_URL = process.env.MONGODB_URL
const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URL, {useNewUrlParser: true, useUnifiedTopology: true})
    .then(()=>app.listen(PORT, ()=>console.log(`Server is running on port ${PORT}, you're doing great Cip, keep it up :)`)))
    .catch((error)=> console.log(error.message))