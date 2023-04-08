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

const server= app.listen(PORT, console.log(`Server running on port ${PORT}`))

import {Server} from 'socket.io'
const io=new Server(server, {
    pingTimeout: 60000,
    cors: {
      origin: "http://localhost:3000",
      // credentials: true,
    },
  })

  io.on("connection", (socket) => {
    console.log("Connected to socket.io");
    socket.on("setup", (userData) => {
        socket.join(userData._id);
        socket.emit("connected");
    });

    socket.on("join chat", (room) => {
        socket.join(room);
        // console.log("User Joined Room: " + room);
      });

      socket.on("new message", (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
    
        if (!chat.users) return console.log("chat.users not defined");
    
        chat.users.forEach((user) => {
          if (user._id == newMessageRecieved.sender._id) return;
    
          socket.in(user._id).emit("message recieved", newMessageRecieved);
        });
      });
})

