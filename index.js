

//G3ZWVwdFNMNbZjC2


const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);
const port= process.env.port||3000;
const io = new Server(server, {
  cors: {
    origin: "https://chatfend.onrender.com",
    methods: ["GET", "POST","PUT"],
  },
});

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

 
  socket.on("join_room", (data) => {
    socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);4
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
app.get('/', (req, res) => res.send('Hello ANAND!'));
server.listen(port, () => {
  console.log(`Example app listening at :${port}`)
});