const {
  StatusCodes,
} = require('http-status-codes');

const UnknownError = require('./unknownError');

class NotFoundError extends UnknownError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.NOT_FOUND;
  }
}

module.exports = NotFoundError;
