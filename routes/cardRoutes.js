const {
  createCard,
  getAllCards,
  getCard }
  = require('../controllers/card.js');
const cardRouter = require('express').Router();

cardRouter.post('/cards', createCard);
cardRouter.get('/cards', getAllCards);
cardRouter.get('/cards/:id', getCard);

module.exports = cardRouter