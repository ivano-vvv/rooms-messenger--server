const { v4: uuidv4 } = require("uuid");

export default class User {
  constructor(name, index) {
    this.id = uuidv4();
    this.name = name;
  }
}
