const {
  StatusCodes,
} = require('http-status-codes');

const User = require('../models/user');
const { handleError } = require('../utils/handleError');

module.exports.createUser = (req, res) => {
  User.create(req.body)
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        invalidRequestMessage: 'Не удалось создать пользователя. Данные не валидны',
      });
    });
};

module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result);
    })
    .catch((error) => {
      handleError(error, res);
    });
};

module.exports.getUser = (req, res) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail(() => {
    })
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Пользователь с ID ${userId} не найден`,
        badRequestMessage: `Пользователь с ID ${userId} не валиден`,
      });
    });
};

module.exports.updateUser = (req, res) => {
  const userId = req.user._id;
  let userInfo;
  if (req.path.includes('avatar')) {
    userInfo = { avatar: req.body.avatar };
  } else {
    userInfo = {
      name: req.body.name,
      about: req.body.about,
    };
  }

  User.findByIdAndUpdate(userId, userInfo, {
    new: true,
    runValidators: true,
    upsert: false,
  })
    .orFail(() => {
    })
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Пользователь с ID ${userId} не найден`,
        badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        // invalidRequestMessage: 'Переданные данные не валидны',
      });
    });
};
