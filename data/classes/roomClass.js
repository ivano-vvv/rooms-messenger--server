const User = require("./userClass");
const Message = require("./messageClass");
const { v4: uuidv4 } = require("uuid");

class Room {
  constructor(creatorName, roomName, roomId, firstUserId) {
    this.id = roomId;
    this.name = roomName;
    this.users = [new User(creatorName, firstUserId)];
    this.history = [new Message(true, null, `The room "${roomName}" created"`)];
  }

  addUser(userName, userId) {
    this.users.push(new User(userName, userId));

    this._addSystemMessage(`${userName} joined the Room`);
  }
  removeUser(userId) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      let name = this._getUserName(userId);
      this.users.splice(index, 1);

      this._addSystemMessage(`${name} left the Room`);
    }
  }
  addUserMessage(author, body) {
    this._addMessage(false, author, body);
  }
  getLastMessage() {
    return this.history[this.history.length - 1];
  }
  getLastUser() {
    return this.users[this.users.length - 1];
  }
  getUserById(id) {
    return this.users.find((u) => u.id === id);
  }

  _addMessage(isSystem, author, body) {
    this.history.push(new Message(isSystem, author, body));
  }
  _getUserName(userId) {
    return this.users.find((u) => u.id === userId).name;
  }
  _addSystemMessage(body) {
    this._addMessage(true, null, body);
  }
}

module.exports = Room;
