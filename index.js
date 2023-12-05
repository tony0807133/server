const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
const messageRoute = require("./routes/messagesRoutes");
const socket = require("socket.io");
const http = require("http");

const app = express();
require("dotenv").config();

app.use(cors());
app.use(express.json());

app.use("/api/auth",userRoutes);
app.use("/api/messages",messageRoute);

mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("DB Connection Successfull");
}).catch((error)=>{
    console.log(error.message);
});

const server = app.listen(process.env.PORT, ()=>{
    console.log(`Server Started on port ${process.env.PORT}`);
});

const PORT = process.env.PORT || 5000;
const server = http.createServer(app);
server.listen(PORT,()=> console.log(`server has started on port:${PORT}`));
app.use(router);

const io = socket(server,{
    cors:{
        origin: "/",
        credential: true,
        methods: ["POST"],
    allowedHeaders: ["my-custom-header"],
    },
});

global.onlineUsers = new Map();

io.on("connection", (socket)=>{
    global.chatSocket = socket;
    socket.on("add-user", (userId)=>{
        onlineUsers.set(userId,socket.id);
    });
    
    socket.on("send-msg",(data)=>{
        const sendUserSocket = onlineUsers.get(data.to);
        if(sendUserSocket){
            socket.to(sendUserSocket).emit("msg-recieve",data.message);
        }
    });
});
