const { v4: uuidv4 } = require("uuid");

class Message {
  constructor(isService, author, body) {
    this.id = uuidv4();
    this.isService = isService;
    this.author = author;
    this.body = body;
  }
}

module.exports = Message;
