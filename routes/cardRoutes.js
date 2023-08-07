const cardRouter = require('express').Router();

const {
  createCard,
  getAllCards,
  handleLike,
  deleteCard,
} = require('../controllers/card');

const {
  CARD_PATH = '/cards',
} = process.env;

cardRouter.post(`${CARD_PATH}`, createCard);
cardRouter.get(`${CARD_PATH}`, getAllCards);
cardRouter.put(`${CARD_PATH}/:id/likes`, handleLike);
cardRouter.delete(`${CARD_PATH}/:id/likes`, handleLike);
cardRouter.delete(`${CARD_PATH}/:id`, deleteCard);

module.exports = cardRouter;
