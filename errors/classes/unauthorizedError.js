const {
  StatusCodes,
} = require('http-status-codes');

const UnknownError = require('./unknownError');

class UnauthorizedError extends UnknownError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}

module.exports = UnauthorizedError;
