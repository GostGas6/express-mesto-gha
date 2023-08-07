const mongoose = require('mongoose');

const {
  StatusCodes,
} = require('http-status-codes');

const defaults = {
  notFoundMessage: 'Объект не найден',
  badRequestMessage: 'ID объекта не валидный',
  invalidRequestMessage: 'Переданные данные не валидны',
  defaultMessage: 'Непредвиденная ошибка сервера',
};

module.exports.handleError = (
  error,
  res,
  config = {
    notFoundMessage: '',
    badRequestMessage: '',
    invalidRequestMessage: '',
    defaultMessage: '',
  },
) => {
  const messages = {
    defaults,
    ...config,
  };
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({
        message: messages.notFoundMessage,
        details: error.message ? error.message : '',
      });
  } else if (error instanceof mongoose.Error.CastError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: messages.badRequestMessage,
        details: error.message ? error.message : '',
      });
  } else if (error instanceof mongoose.Error.ValidationError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: messages.invalidRequestMessage,
        details: error.message ? error.message : '',
      });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        message: messages.defaultMessage,
        details: error.message ? error.message : '',
      });
  }
};
