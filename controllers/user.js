const {
  StatusCodes,
} = require('http-status-codes');

const User = require('../models/user');
const { handleRequestErrors } = require('../errors/handleRequestErrors');

module.exports.getAllUsers = (req, res, next) => {
  User.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result);
    })
    .catch((error) => {
      handleRequestErrors(error, next);
    });
};

module.exports.getUser = (req, res, next) => {
  const userId = req.params.id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};

module.exports.updateUser = (req, res, next) => {
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
    .orFail()
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleRequestErrors(
        error,
        next,
        {
          notFoundMessage: `Пользователь с ID ${userId} не найден`,
          badRequestMessage: `Пользователь с ID ${userId} не валиден`,
        },
      );
    });
};
