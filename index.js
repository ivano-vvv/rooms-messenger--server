const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;
const cors = require("cors");

const data = require("./data/rooms");
const consoleMessages = require("./consoleMessages");

app.use(cors());

io.on("connection", (socket) => {
  const user = {
    id: socket.id,
  };

  consoleMessages.userConnected(user.id);

  socket.on("createRoom", ({ creatorName, roomName }) => {
    let room = data.createRoom(creatorName, roomName, user.id);
    user.room = room.id;
    user.name = room.users[0].name;

    socket.join(room.id);
    consoleMessages.roomCreated(user.name, user.id, room.name, room.id);

    io.to(room.id).emit("roomData", {
      room,
      userData: { id: user.id, name: user.name },
    });
    socket.emit("connectionData", {
      userId: user.id,
      roomId: room.id,
      username: user.name,
    });
  });

  socket.on("joinRoom", ({ roomId, username }) => {
    let room = data.getRoomById(roomId);

    if (room) {
      user.room = room.id;
      user.name = username;

      room.addUser(user.name, user.id);

      io.to(room.id).emit("newUser", {
        message: room.getLastMessage(),
        users: room.users,
      });

      socket.join(room.id);

      consoleMessages.userJoinedRoom(user.name, user.id, room.name, room.id);

      socket.emit("roomData", { room, userData: room.getLastUser() });
      socket.emit("connectionData", {
        userId: user.id,
        roomId: room.id,
        username: user.name,
      });

      consoleMessages.userGotRoomData(user.name, user.id, room.name, room.id);
    } else {
      socket.emit("invalidRoomId");
    }
  });

  socket.on("rejoinRoom", ({ userId, username, roomId }) => {
    let room = data.getRoomById(roomId);
    if (room) {
      user.room = roomId;

      room.addUser(username, user.id);

      io.to(roomId).emit("newUser", {
        message: room.getLastMessage(),
        users: room.users,
      });

      socket.join(roomId);

      consoleMessages.userJoinedRoom(user.name, user.id, room.name, room.id);

      socket.emit("roomData", { room, userData: room.getLastUser() });
      socket.emit("connectionData", {
        userId: user.id,
        roomId: room.id,
        username: user.name,
      });

      consoleMessages.userGotRoomData(user.name, user.id, room.name, room.id);
    } else {
      socket.emit("invalidRejoinData");
    }
  });

  socket.on("leaveRoom", ({ roomId }) => {
    let room = data.getRoomById(roomId);
    if (room) {
      let name = room.getUserById(user.id).name;

      socket.emit("logOut");
      socket.leave(room.id);
      user.room = "";

      room.removeUser(user.id);

      if (room.users.length === 0) {
        let removedRoomData = {
          id: room.id,
          name: room.name,
        };
        data.removeRoomById(room.id);
        consoleMessages.roomHasBeenRemoved(
          removedRoomData.name,
          removedRoomData.id
        );
      } else {
        io.to(roomId).emit("removeUser", {
          message: room.getLastMessage(),
          users: room.users,
        });
      }

      consoleMessages.userLeftRoom(name, user.id, room.name, room.id);
    }
  });

  socket.on("message", ({ roomId, message }) => {
    let room = data.getRoomById(roomId);
    if (room) {
      room.addUserMessage(room.getUserById(user.id), message);
      io.to(roomId).emit("message", room.getLastMessage());
    }
  });

  socket.on("disconnect", () => {
    let room = data.getRoomById(user.room);

    if (room) {
      room.removeUser(user.id);
      io.to(room.id).emit("removeUser", {
        message: room.getLastMessage(),
        users: room.users,
      });
    }
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
