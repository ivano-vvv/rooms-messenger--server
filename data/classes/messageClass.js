const { v4: uuidv4 } = require("uuid");

export default class Message {
  constructor(isService, author, body) {
    this.id = uuidv4();
    this.isService = isService;
    this.author = author;
    this.body = body;
  }
}
