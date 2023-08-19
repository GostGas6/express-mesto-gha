const authRouter = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  signUp,
  signIn,
} = require('../controllers/auth');

const {
  validateEmail,
  validateRequiredString,
  validateShortString,
  validateUrl,
} = require('../utils/validators');

const {
  AUTH_PATH = '',
} = process.env;

authRouter.post(
  `${AUTH_PATH}/signup`,
  celebrate({
    body: Joi.object().keys({
      email: validateEmail(),
      password: validateRequiredString(),
      name: validateShortString(),
      about: validateShortString(),
      avatar: validateUrl(),
    }),
  }),
  signUp,
);
authRouter.post(
  `${AUTH_PATH}/signin`,
  celebrate({
    body: Joi.object().keys({
      email: validateEmail(),
      password: validateRequiredString(),
    }),
  }),
  signIn,
);

module.exports = authRouter;
