const {
  StatusCodes,
} = require('http-status-codes');

const UnknownError = require('./unknownError');

class ForbiddenError extends UnknownError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.FORBIDDEN;
  }
}

module.exports = ForbiddenError;
