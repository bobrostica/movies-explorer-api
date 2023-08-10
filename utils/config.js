require('dotenv').config();

const {
  JWT_SECRET = 'dev-secret',
  DB_HOST = 'mongodb://127.0.0.1:27017/bitfilmsd',
  PORT = 3000,
} = process.env;

const LOG_REQUESTS_FILE = 'requests.log';
const LOG_ERRORS_FILE = 'errors.log';

module.exports = {
  JWT_SECRET,
  DB_HOST,
  PORT,
  LOG_REQUESTS_FILE,
  LOG_ERRORS_FILE,
};
