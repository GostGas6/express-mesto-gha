const mongoose = require('mongoose');

const {
  StatusCodes,
} = require('http-status-codes');

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
  const restoredConfig = {
    ...config,
    notFoundMessage: config.notFoundMessage || 'Объект не найден',
    badRequestMessage: config.badRequestMessage || 'ID объекта не валидный',
    invalidRequestMessage: config.invalidRequestMessage || 'Переданные данные не валидны',
    defaultMessage: config.defaultMessage || 'Непредвиденная ошибка сервера',
  };
  if (error instanceof mongoose.Error.DocumentNotFoundError) {
    res
      .status(StatusCodes.NOT_FOUND)
      .send({
        message: restoredConfig.notFoundMessage,
        details: error.message ? error.message : '',
      });
  } else if (error instanceof mongoose.Error.CastError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: restoredConfig.badRequestMessage,
        details: error.message ? error.message : '',
      });
  } else if (error instanceof mongoose.Error.ValidationError) {
    res
      .status(StatusCodes.BAD_REQUEST)
      .send({
        message: restoredConfig.invalidRequestMessage,
        details: error.message ? error.message : '',
      });
  } else {
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .send({
        message: restoredConfig.defaultMessage,
        details: error.message ? error.message : '',
      });
  }
};
