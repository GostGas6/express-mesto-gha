const { Joi } = require('celebrate');

const urlPattern = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/;

module.exports.validateEmail = () => Joi.string().required().email();
module.exports.validateRequiredString = () => Joi.string().required();
module.exports.validateShortString = () => Joi.string().min(2).max(30);
module.exports.validateRequiredShortString = () => Joi.string().required().min(2).max(30);
module.exports.validateUrl = () => Joi.string().pattern(urlPattern);
module.exports.validateRequiredUrl = () => Joi.string().pattern(urlPattern).required();
module.exports.validateMongoID = () => Joi.string().hex().length(24);
