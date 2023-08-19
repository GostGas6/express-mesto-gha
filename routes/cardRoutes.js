const cardRouter = require('express').Router();
const auth = require('../middleware/auth');
const { celebrate, Joi } = require('celebrate');

const {
  createCard,
  getAllCards,
  handleLike,
  deleteCard,
} = require('../controllers/card');
const {
  validateRequiredShortString,
  validateRequiredUrl,
  validateMongoID,
} = require('../utils/validators');

const {
  CARD_PATH = '/cards',
} = process.env;

cardRouter.post(
  `${CARD_PATH}`,
  auth,
  celebrate({
    body: Joi.object().keys({
      name: validateRequiredShortString(),
      link: validateRequiredUrl(),
    }),
  }),
  createCard,
);
cardRouter.get(
  `${CARD_PATH}`,
  auth,
  getAllCards,
);

cardRouter.put(
  `${CARD_PATH}/:id/likes`,
  auth,
  celebrate({
    params: Joi.object().keys({
      id: validateMongoID(),
    }),
  }),
  handleLike,
);
cardRouter.delete(
  `${CARD_PATH}/:id/likes`,
  auth,
  celebrate({
    params: Joi.object().keys({
      id: validateMongoID(),
    }),
  }),
  handleLike,
);
cardRouter.delete(
  `${CARD_PATH}/:id`,
  auth,
  celebrate({
    params: Joi.object().keys({
      id: validateMongoID(),
    }),
  }),
  deleteCard,
);

module.exports = cardRouter;
