const winston = require('winston');
const expressWinston = require('express-winston');

const { LOG_REQUESTS_FILE, LOG_ERRORS_FILE } = require('../utils/config');

const requestLogger = expressWinston.logger({
  transports: [new winston.transports.File({ filename: LOG_REQUESTS_FILE })],
  firmat: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [new winston.transports.File({ filename: LOG_ERRORS_FILE })],
  firmat: winston.format.json(),
});

module.exports = {
  requestLogger,
  errorLogger,
};
