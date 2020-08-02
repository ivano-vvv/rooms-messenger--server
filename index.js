const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

const data = require("./data/rooms");

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("createRoom", ({ creatorName, roomName }) => {
    let id = data.createRoom(creatorName, roomName);
    socket.join(id);
    let room = data.getRoomById(id);
    console.log(
      `user ${creatorName} (${room.users[0].id}) created a Room named "${roomName}" (${room.id})`
    );

    io.to(id).emit("roomData", room);
    console.log(
      `user ${creatorName} (${room.users[0].id}) get data about the Room "${roomName}" (${room.id})`
    );
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
