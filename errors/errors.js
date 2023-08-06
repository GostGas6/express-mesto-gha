const { StatusCodes } = require('http-status-codes');

class itemNotFound extends Error {
  constructor() {
    super();
    this.name = this.constructor.name;
    this.status = StatusCodes.NOT_FOUND
  }
}

module.exports = itemNotFound;