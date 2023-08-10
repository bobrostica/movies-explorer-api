const { celebrate, Joi } = require('celebrate');

const registerUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().max(254),
    password: Joi.string().required().min(8),
    name: Joi.string().required().min(2).max(30),
  }),
});

const loginUserValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().max(254),
    password: Joi.string().required().min(8),
  }),
});

const updateUserValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email().max(254),
  }),
});

module.exports = {
  loginUserValidator,
  registerUserValidator,
  updateUserValidator,
};
