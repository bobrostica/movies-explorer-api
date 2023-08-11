const ApiError = require('../errors/ApiError');
const { PAGE_NOT_FOUND_MESSAGE } = require('../utils/constants');

const notFoundHandler = (req, res, next) => {
  next(ApiError.NotFoundError(PAGE_NOT_FOUND_MESSAGE));
};

module.exports = notFoundHandler;
