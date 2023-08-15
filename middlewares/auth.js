const jsonWebToken = require('jsonwebtoken');
const ApiError = require('../errors/ApiError');

const { JWT_SECRET } = require('../utils/config');
const { AUTHENTICATION_DEFAULT_MESSAGE } = require('../utils/constants');

const auth = (req, res, next) => {
  const { jwt } = req.cookies;

  if (!jwt) {
    next(ApiError.AuthenticationError(AUTHENTICATION_DEFAULT_MESSAGE));
    return;
  }

  let payload;

  try {
    payload = jsonWebToken.verify(jwt, JWT_SECRET);
  } catch (err) {
    next(ApiError.AuthenticationError(AUTHENTICATION_DEFAULT_MESSAGE));
    return;
  }

  req.user = payload;
  next();
};

module.exports = auth;
