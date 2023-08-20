const userRouter = require('express').Router();
const auth = require('../middleware/auth');
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUser,
  getCurrentUser,
  updateUser,
} = require('../controllers/user');

const {
  validateMongoID,
  validateShortString,
  validateRequiredUrl,
} = require('../utils/validators');

const {
  USER_PATH = '/users',
} = process.env;

userRouter.get(
  `${USER_PATH}`,
  auth,
  getAllUsers,
);
userRouter.get(
  `${USER_PATH}/me`,
  auth,
  getCurrentUser,
);
userRouter.get(
  `${USER_PATH}/:id`,
  auth,
  celebrate({
    params: Joi.object().keys({
      id: validateMongoID(),
    }),
  }),
  getUser,
);
userRouter.patch(
  `${USER_PATH}/me`,
  auth,
  celebrate({
    body: Joi.object().keys({
      name: validateShortString().required(),
      about: validateShortString().required(),
    }),
  }),
  updateUser,
);
userRouter.patch(
  `${USER_PATH}/me/avatar`,
  auth,
  celebrate({
    body: Joi.object().keys({
      avatar: validateRequiredUrl(),
    }),
  }),
  updateUser,
);

module.exports = userRouter;
