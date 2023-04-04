import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'

import userRoutes from './routes/userRoutes.js'
import chatRoutes from './routes/chatRoutes.js'
import messageRoutes from './routes/messageRoutes.js'

dotenv.config()

connectDB()

const app= express() 

app.use(express.json())

app.use('/users',userRoutes)
app.use('/chats',chatRoutes)
app.use('/message',messageRoutes)

app.get('/', (req,res)=>{
    res.send('API is running...')
})


app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT

app.listen(PORT, console.log(`Server running on port ${PORT}`))