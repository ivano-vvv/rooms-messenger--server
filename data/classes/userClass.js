const { v4: uuidv4 } = require("uuid");

class User {
  constructor(name, index) {
    this.id = uuidv4();
    this.name = name;
  }
}

module.exports = User;
