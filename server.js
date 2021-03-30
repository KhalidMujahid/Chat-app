const express = require("express");
const path = require("path");

const app = express();
const http = require("http").createServer(app);

app.use(express.static(path.join(__dirname, "/public")));

const io = require("socket.io")(http);

io.on("connection", socket => {
   console.log("Connected..");
   
   socket.on("sendMessage", message => {
       console.log(message);
       socket.broadcast.emit("sendToAll", message);
   });
});

io.on("disconnected", socket => {
   console.log("Disconnected...");
});

const PORT = process.env.PORT || 2000;
http.listen(PORT, () => console.log("Running on port ", PORT));
