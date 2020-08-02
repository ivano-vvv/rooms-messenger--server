const User = require("./userClass");
const Message = require("./messageClass");
const { v4: uuidv4 } = require("uuid");

class Room {
  constructor(creatorName, roomName, id) {
    this.id = id;
    this.name = roomName;
    this.users = [new User(creatorName)];
    this.history = [new Message(true, null, `The room "${roomName}" created"`)];
  }

  addUser(userName) {
    this.users.push(new User(userName));

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
  addUserMessage(isSystem, author, body) {
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
    let message = new Message(isSystem, author, body);
    this.history.push({ ...message });
  }
  _getUserName(userId) {
    return this.users.find((u) => u.id === userId).name;
  }
  _addSystemMessage(body) {
    this._addMessage(true, null, body);
  }
}

module.exports = Room;
