const Room = require("./classes/roomClass");
const { v4: uuidv4 } = require("uuid");

const data = {
  createRoom(creatorName, roomName) {
    const id = uuidv4();
    this._addRoom(creatorName, roomName, id);
    return id;
  },
  getRoomById(id) {
    return this._rooms.find((r) => r.id === id);
  },

  _rooms: [],
  _addRoom(creatorName, roomName, id) {
    this._rooms.push(new Room(creatorName, roomName, id));
  },
  _removeRoom(roomId) {
    const index = this._rooms.findIndex((room) => room.id === roomId);
    if (index !== -1) this._rooms = this._rooms.splice(index, 1);
  },
};

module.exports = data;
