const rateLimit = require('express-rate-limit');

const {
  LIMITER_WINDOW_TIME,
  LIMITER_REQUESTS_COUNT,
} = require('../utils/constants');

const rateLimiter = () => {
  return rateLimit({
    windowMs: LIMITER_WINDOW_TIME,
    max: LIMITER_REQUESTS_COUNT,
  });
};

module.exports = rateLimiter;
