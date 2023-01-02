const dotenv = require('dotenv').config();

const io = require("socket.io")(8008, {
  cors: {
    origin: `${process.env.CLIENT_URL}`
  },
});

console.log("CLIENT_URL: ", `${process.env.CLIENT_URL}`)

let clients = [];

const addClient = (uid, sid) => {
  !clients.some((client)=> client.uid === uid) &&
  clients.push({uid, sid});
}

io.on("connection", (socket) => {
  console.log("A client connected to the socket server");
  //take user id and socket id from user
  io.emit('welcome', 'this is from socket server');
  socket.on("addClient", (uid) => {
    addClient(uid, socket.id);
    io.emit("getClients", clients);
  })
});