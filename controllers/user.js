const User = require('../models/user');
const {
  StatusCodes
} = require('http-status-codes');
const mongoose = require('mongoose');
const itemNotFound = require('../errors/errors.js');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user)
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({
            message: `Не удалось создать пользователя. Данные не валидны`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result)
    })
    .catch((error) => {
      res
        .status(StatusCodes.INTERNAL_SERVER_ERROR)
        .send({
          message: error.message ? error.message : 'Непредвиденная ошибка сервера'
        })
    })
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id
  User.findById(userId)
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user)
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Пользователь с ID ${userId} не найден`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id
  let userInfo = {};

  // проверка обновляемых параметров по пути запроса
  if (req.path.includes('avatar')) {
    userInfo = { avatar: req.body.avatar }
  } else {
    userInfo = {
      name: req.body.name,
      about: req.body.about
    }
  }

  User.findByIdAndUpdate(userId, userInfo, {
    new: true,
    runValidators: true,
    upsert: false
  })
    .orFail(() => {
      throw itemNotFound(
        `Информацию о пользователе с ID ${userId} невозможно обновить.
         Пользователь не найден`
      )
    })
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user)
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(StatusCodes.NOT_FOUND)
          .send({
            message: `Пользователь с ID ${userId} не найден`,
            details: error.message ? error.message : ''
          })
      } else if (error instanceof itemNotFound) {
        res
          .status(StatusCodes.BAD_REQUEST)
          .send({
            message: `Не удалось обновить информацию пользователя. Данные не валидны`,
            details: error.message ? error.message : ''
          })
      } else {
        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .send({
            message: error.message ? error.message : 'Непредвиденная ошибка сервера'
          })
      }
    })
};