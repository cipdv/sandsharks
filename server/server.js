import express from "express"
import cors from 'cors'
import path from 'path'
//middleware
import { notFound, errorHandler } from './middleware/errorMiddleware.js'
//routes
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
//configs
import dotenv from 'dotenv'
import connectdb from './config/db.js'
dotenv.config()
connectdb()

const app = express()
app.use(express.json())
app.use(cors())

app.get('/', (req, res)=> {
    res.send('API is running')
})

//routes
app.use('/api/users', userRoutes)
app.use('/api/posts', postRoutes)
app.use('/api/upload', uploadRoutes)

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

//middleware
// app.use(notFound)
// app.use(errorHandler)

const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT} . . . great job Cip, keep it up!`))


