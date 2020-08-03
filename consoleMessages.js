const consoleMessages = {
  userConnected(id) {
    this._log(`a user ${id} connected`);
  },
  roomCreated(username, userId, roomname, roomId) {
    this._log(
      `user ${username} (${userId}) created a Room named "${roomname}" (${roomId})`
    );
  },
  userJoinedRoom(username, userId, roomname, roomId) {
    this._log(
      `user ${username} (${userId}) joined the Room "${roomname}" (${roomId})`
    );
  },
  userGotRoomData(username, userId, roomname, roomId) {
    this._log(
      `user ${username} (${userId}) have got data about the Room "${roomname}" (${roomId})`
    );
  },
  userLeftRoom(username, userId, roomname, roomId) {
    this._log(
      `user ${username} (${userId}) left the Room "${roomname}" (${roomId})`
    );
  },
  roomHasBeenRemoved(name, id) {
    this._log(`The Room "${name}" (${id}) has been removed`);
  },

  _log(m) {
    console.log(m);
  },
};

module.exports = consoleMessages;
