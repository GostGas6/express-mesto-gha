const jwt = require('jsonwebtoken');

const UnauthorizedError = require('../errors/classes/unauthorizedError');

const {
  JWT_SECRET = 'b1gSecret',
} = process.env;

module.exports = (req, res, next) => {
  let payload;
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(
      new UnauthorizedError(
        'Вы не авторизованы для данного запроса - нет токена доступа',
      ),
    );
  }
  const token = authorization.replace('Bearer ', '');
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return next(
      new UnauthorizedError(
        'Вы не авторизованы для данного запроса - токен не валиден или устарел',
      ),
    );
  }
  req.user = payload;
  next();
};
