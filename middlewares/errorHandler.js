const {
  DEFAULT_ERROR_MESSAGE,
  DEFAULT_ERROR_CODE,
} = require('../utils/constants');

const errorHandler = (err, req, res, next) => {
  const { statusCode = DEFAULT_ERROR_CODE, message } = err;

  res.status(statusCode).send({
    message:
      statusCode === DEFAULT_ERROR_CODE ? DEFAULT_ERROR_MESSAGE : message,
  });

  next();
};

module.exports = errorHandler;
