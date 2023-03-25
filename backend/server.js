import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import {notFound, errorHandler} from './middleware/errorMiddleware.js'



dotenv.config()

connectDB()

const app= express() 

app.use(express.json())


app.get('/', (req,res)=>{
    res.send('API is running...')
})


app.use(notFound)
app.use(errorHandler)

const PORT=process.env.PORT

app.listen(PORT, console.log(`Server running on port ${PORT}`))