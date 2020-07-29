const { default: Room } = require("./classes/roomClass");

const data = {
  rooms: [],

  _addRoom(creatorName, roomName) {
    this.rooms.push(new Room(creatorName, roomName));
  },
  _removeRoom(roomId) {
    const index = this.rooms.findIndex((room) => room.id === roomId);
    if (index !== -1) this.rooms = this.rooms.splice(index, 1);
  },
};

export default data;
