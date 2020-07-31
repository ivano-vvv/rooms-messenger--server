const { default: User } = require("./userClass");
const { default: Message } = require("./messageClass");
const { v4: uuidv4 } = require("uuid");

export default class Room {
  constructor(creatorName, roomName) {
    let firstUser = new User(creatorName);
    let firstMessage = new Message(
      true,
      null,
      `The room "${roomName}" created"`
    );

    this.id = uuidv4();
    this.name = roomName;
    this.users = [{ ...firstUser }];
    this.history = [{ ...firstMessage }];
  }

  addUser(userName) {
    let newUser = new User(userName);

    this.users.push({ ...newUser });

    this._addSystemMessage(`${userName} joined the Room`);
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
