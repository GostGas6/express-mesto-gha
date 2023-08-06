const {
  StatusCodes,
} = require('http-status-codes');

const Card = require('../models/card');
const { handleError } = require('../utils/handleError');

module.exports.createCard = (req, res) => {
  Card.create({
    ...req.body,
    owner: req.user._id,
  })
    .then((user) => {
      res
        .status(StatusCodes.CREATED)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        invalidRequestMessage: 'Не удалось создать карточку места. Данные не валидны',
      });
    });
};

module.exports.getAllCards = (req, res) => {
  Card.find({})
    .then((result) => {
      res.status(StatusCodes.OK).send(result);
    })
    .catch((error) => {
      handleError(error, res);
    });
};

module.exports.getCard = (req, res) => {
  const cardId = req.params.id;
  Card.findById(cardId)
    .orFail(() => {
    })
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
        badRequestMessage: `Карточка места с с ID ${cardId} не валиденa`,
      });
    });
};
module.exports.handleLike = (req, res) => {
  const cardId = req.params.id;
  let action;
  switch (req.method) {
    case 'PUT':
      action = '$addToSet';
      break;
    case 'DELETE':
      action = '$pull';
      break;
    default:
      action = '$pull';
      break;
  }

  Card.findByIdAndUpdate(
    cardId,
    { [action]: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => {
    })
    .populate([{ path: 'likes', model: 'user' }])
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
        badRequestMessage: `Карточка места с с ID ${cardId} не валиднa`,
      });
    });
};

module.exports.deleteCard = (req, res) => {
  const cardId = req.params.id;
  Card.findByIdAndRemove(cardId)
    .orFail(() => {
    })
    .then((user) => {
      res
        .status(StatusCodes.OK)
        .send(user);
    })
    .catch((error) => {
      handleError(error, res, {
        notFoundMessage: `Карточка места с ID ${cardId} не найдена`,
        badRequestMessage: `Карточка места с с ID ${cardId} не валиднa`,
      });
    });
};
