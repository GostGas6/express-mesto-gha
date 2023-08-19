const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const UnauthorizedError = require('../errors/classes/unauthorizedError');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: 'Жак-Ив Кусто',
    minlength: [2, 'Минимальная длина поля 2 символа'],
    maxlength: [30, 'Максимальная длина поля 30 символов'],
  },
  about: {
    type: String,
    default: 'Исследователь',
    minlength: [2, 'Минимальная длина поля 2 символа'],
    maxlength: [30, 'Максимальная длина поля 30 символов'],
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    validate: {
      validator: (value) => validator.isURL(
        value,
        {
          protocols: ['http', 'https'],
          require_protocol: true,
        },
      ),
      message: () => 'Некоректный URL',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => (
        validator.isEmail(value)
      ),
      message: () => 'Некоректный email адрес',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCreds = function findOne(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new UnauthorizedError(
          'Пользователь не найден или данные не верны',
        ));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new UnauthorizedError(
              'Пользователь не найден или данные не верны',
            ));
          }
          return user;
        });
    });
};
module.exports = mongoose.model('user', userSchema);
