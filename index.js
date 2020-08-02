const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

const data = require("./data/rooms");

io.on("connection", (socket) => {
  let userId = socket.id;
  console.log("user connected");

  socket.on("createRoom", ({ creatorName, roomName }) => {
    let roomId = data.createRoom(creatorName, roomName, userId);
    socket.join(roomId);
    let room = data.getRoomById(roomId);
    console.log(
      `user ${creatorName} (${room.users[0].id}) created a Room named "${roomName}" (${room.id})`
    );

    io.to(roomId).emit("roomData", { room, userData: room.users[0] });
    console.log(
      `user ${creatorName} (${room.users[0].id}) get data about the Room "${roomName}" (${room.id})`
    );
  });

  socket.on("joinRoom", ({ roomId, userName }) => {
    let room = data.getRoomById(roomId);
    if (room) {
      room.addUser(userName, userId);

      io.to(roomId).emit("newUser", {
        message: room.getLastMessage(),
        users: room.users,
      });

      socket.join(roomId);

      console.log(
        `user ${room.users[room.users.length - 1].name} (${
          room.users[room.users.length - 1].id
        }) joined the Room "${room.name}" (${room.id})`
      );

      socket.emit("roomData", { room, userData: room.getLastUser() });

      console.log(
        `user ${room.users[room.users.length - 1].name} (${
          room.users[room.users.length - 1].id
        }) get data about the Room "${room.name}" (${room.id})`
      );
    }
  });

  socket.on("leaveRoom", ({ roomId, userId }) => {
    let room = data.getRoomById(roomId);
    if (room) {
      let name = room.getUserById(userId).name;

      socket.emit("logOut");
      socket.leave(roomId);

      room.removeUser(userId);

      io.to(roomId).emit("removeUser", {
        message: room.getLastMessage(),
        users: room.users,
      });

      console.log(
        `user ${name} (${userId}) left the Room "${room.name}" (${room.id})`
      );
    }
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
