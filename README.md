# The Rooms Messenger: Server

The Rooms is a messenger for real-time chatting.

Client: https://rooms-messenger.netlify.app/

## Server Interface

### .emit-methods

#### createRoom

**socket.emit("createRoom", { creatorName, roomName })**

Sending a data for creating a new room.

#### joinRoom

**socket.emit("joinRoom", { roomId, username })**

Sending a data for joining an existing room.

#### rejoinRoom

**socket.emit("rejoinRoom", { userId, username, roomId })**

Sending a data for returning to the room in case of unexpecting disconnection.

#### leaveRoom

**socket.emit("leaveRoom", { roomId })**

Sending a data to stop getting new messages from the room.

#### message

**socket.emit("message", { roomId, message })**

Sending a new message to the room.

### .on-methods

#### connectionData

**socket.on("connectionData", { userId, roomId, username })**

Sending a userdata after joining any room.

#### invalidRoomId

**socket.on("invalidRoomId", ())**

Notifying of bad Room ID sent to the server for joining a room.

#### invalidRejoinData

**socket.on("invalidRejoinData", ())**

Notifying of bad data provided by user for returning to the room.

#### roomData

**socket.on("roomData", ({ room, userData }))**

room = { id, name, users, history }
userData = { id, name }

Sending a data on the Room after user joining.

#### newUser

**socket.on("newUser", ({ users, message }))**

users = [{ id, name }]
message = { id, isService: true, author: null, body }

Sending a data to the Room Members after a new member joining.

#### removeUser

**socket.on("removeUser", ({ users, message }))**

users = [{ id, name }]
message = { id, isService: true, author: null, body }

Sending a data to the rest Room Members after one of the members leaving.

#### logOut

**socket.on("logOut", ())**

Notifying a users that they has left the room.

#### message

**socket.on("message", ({ id, isService, author: { id, name }, body }))**

Providing to users new messages in the room.
