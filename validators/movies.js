const { celebrate, Joi } = require('celebrate');

const { URL_PATTERN } = require('../utils/constants');

const saveMovieValidator = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().pattern(URL_PATTERN).required(),
    trailerLink: Joi.string().pattern(URL_PATTERN).required(),
    thumbnail: Joi.string().pattern(URL_PATTERN).required(),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const movieIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().required().hex().length(24),
  }),
});

module.exports = {
  saveMovieValidator,
  movieIdValidator,
};
