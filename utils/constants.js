// CORS
const allowedCors = ['http://localhost:3000'];

const ALLOWED_METHODS = 'HEAD,GET,PUT,PATCH,POST,DELETE';

const corsOptions = {
  origin: allowedCors,
  methods: ALLOWED_METHODS,
};

// Rate Limiter
// 100 requests per 15 min.
const LIMITER_WINDOW_TIME = 15 * 60 * 1000; // 15 min.
const LIMITER_REQUESTS_COUNT = 100;

// Token
// Token age - 7 days: 1000 * 60 * 60 * 24 * 7 = 604800000
const MAX_COOKIE_TOKEN_AGE = 604800000;
const MAX_TOKEN_AGE = '7d';
const TOKEN_NAME = 'jwt';

// Signout
const SIGNOUT_MESSAGE = 'logged out';

// Exceptions
const exceptionMessages = {
  DEFAULT_ERROR_MESSAGE: 'На сервере произошла ошибка',
  AUTHENTICATION_DEFAULT_MESSAGE: 'Ошибка авторизации',
  CONFLICT_EMAIL_MESSAGE: 'Пользователь с указанным email уже существует',
  FORBIDDEN_DEFAULT_MESSAGE: 'Нет доступа',
  USER_NOT_FOUND_MESSAGE: 'Пользователь не найден',
  MOVIE_NOT_FOUND_MESSAGE: 'Фильм не найден',
  PAGE_NOT_FOUND_MESSAGE: 'Страница не найдена',
  VALIDATION_DEFAULT_MESSAGE: 'Переданы некорректные данные',
  WRONG_CREDENTIALS_MESSAGE: 'Неправильные почта или пароль',
};

const DEFAULT_ERROR_CODE = 500;

// Mongodb
const MONGO_NON_UNIQUE_ERROR_CODE = 11000;

module.exports = {
  ...exceptionMessages,
  DEFAULT_ERROR_CODE,
  corsOptions,
  MAX_TOKEN_AGE,
  MAX_COOKIE_TOKEN_AGE,
  TOKEN_NAME,
  SIGNOUT_MESSAGE,
  MONGO_NON_UNIQUE_ERROR_CODE,
  LIMITER_WINDOW_TIME,
  LIMITER_REQUESTS_COUNT,
};
