const {
  StatusCodes,
} = require('http-status-codes');

const UnknownError = require('./unknownError');

class BadRequestError extends UnknownError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

module.exports = BadRequestError;
