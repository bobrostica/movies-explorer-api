const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const cors = require('cors');

const { DB_HOST } = require('./utils/config');
const rateLimiter = require('./middlewares/rateLimiter');
const { corsOptions } = require('./utils/constants');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const index = require('./routes/index');

const app = express();
mongoose.connect(DB_HOST);

app.use(requestLogger);

app.use(helmet());
app.use(rateLimiter());
app.use(cors(corsOptions));

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);
app.use(cookieParser());

app.use(index);

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

module.exports = app;
