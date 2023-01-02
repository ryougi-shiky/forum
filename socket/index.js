const dotenv = require('dotenv').config();

const io = require("socket.io")(process.env.SOCKET_SERVER_PORT, {
  cors: {
    origin: `${process.env.CLIENT_URL}`
  },
});

console.log("CLIENT_URL: ", `${process.env.CLIENT_URL}`);
console.log("Socket server running on port: ", `${process.env.SOCKET_SERVER_PORT}`);

// let users = [];

// const addUser = (uid, sid) => {
//   !users.some((user) => user.uid === uid) &&
//   users.push({uid, sid});
// }



io.on("connection", (socket) => {
  console.log("A user connected to the socket server");
  // console.log("user socket id: ", socket.id);
  // //take user id and socket id from user
  // io.emit('welcome', 'this is from socket server');
  // socket.on("addUser", (uid) => {
  //   addUser(uid, socket.id);
  //   io.emit("getUsers", users);
  // })
});