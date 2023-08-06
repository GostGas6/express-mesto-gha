const User = require('../models/user');
const {
  StatusCodes
} = require('http-status-codes');
const mongoose = require('mongoose');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user)
    })
    .catch((error) => {
      console.log(error)
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
}

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
}

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
          .status(StatusCodes.BAD_REQUEST)
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
}