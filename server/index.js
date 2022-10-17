const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

//create server
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});

io.on("connection", (socket) => {
    console.log(`User Connected ${socket.id}`);

    socket.on("join_room", (room) => {
        socket.join(room);
    });

    socket.on("send message", (data) => {
        socket.to(data.room).emit("receive_message", data);
    });
});

server.listen(3001, () => {
    console.log("Server runing PORT -> 3001");
});
