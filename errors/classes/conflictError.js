const {
  StatusCodes,
} = require('http-status-codes');

const UnknownError = require('./unknownError');

class ConflictError extends UnknownError {
  constructor(message, details = null) {
    super(message, details);
    this.statusCode = StatusCodes.CONFLICT;
  }
}

module.exports = ConflictError;
