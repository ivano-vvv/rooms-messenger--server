const Room = require("./classes/roomClass");
const { v4: uuidv4 } = require("uuid");

const data = {
  createRoom(creatorName, roomName, firstUserId) {
    const roomId = uuidv4();
    this._addRoom(creatorName, roomName, roomId, firstUserId);
    return this.getRoomById(roomId);
  },
  getRoomById(id) {
    return this._rooms.find((r) => r.id === id);
  },

  _rooms: [],
  _addRoom(creatorName, roomName, roomId, firstUserId) {
    this._rooms.push(new Room(creatorName, roomName, roomId, firstUserId));
  },
  _removeRoom(roomId) {
    const index = this._rooms.findIndex((room) => room.id === roomId);
    if (index !== -1) this._rooms = this._rooms.splice(index, 1);
  },
};

module.exports = data;
