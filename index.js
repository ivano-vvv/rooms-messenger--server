const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const port = process.env.PORT || 5000;

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

http.listen(port, () => {
  console.log(`listening on *:${port}`);
});
