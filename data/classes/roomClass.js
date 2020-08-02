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

    return {
      userData: this.users[this.users.length - 1],
      systemMsg: this.history[this.history.length - 1],
    };
  }
  removeUser(userId) {
    const index = this.users.findIndex((u) => u.id === userId);
    if (index !== -1) {
      this.users = this.users.splice(index, 1);
      this._addSystemMessage(`${this._getUserName(userId)} left the Room`);
    }
  }
  addUserMessage(isSystem, author, body) {
    this._addMessage(false, author, body);
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
