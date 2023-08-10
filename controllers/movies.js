const { default: mongoose } = require('mongoose');
const Movie = require('../models/movie');

const ApiError = require('../errors/ApiError');
const {
  VALIDATION_DEFAULT_MESSAGE,
  FORBIDDEN_DEFAULT_MESSAGE,
} = require('../utils/constants');

// Получить все фильмы текущего пользователя
const getUserMovies = (req, res, next) => {
  const userId = req.user._id;

  Movie.find({ owner: userId })
    .then((movies) => res.send(movies))
    .catch(next);
};

const saveMovie = (req, res, next) => {
  const userId = req.user._id;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    owner: userId,
    nameEN,
    thumbnail,
    movieId,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ApiError.ValidationError(VALIDATION_DEFAULT_MESSAGE));
        return;
      }

      next(err);
    });
};

const deleteMovie = (req, res, next) => {
  const { id: movieId } = req.params;
  const userId = req.user._id;

  Movie.isUserOwner({ userId, movieId })
    .then((isOwner) => {
      if (isOwner) {
        return Movie.findByIdAndDelete(movieId);
      }

      next(ApiError.ForbiddenError(FORBIDDEN_DEFAULT_MESSAGE));
    })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        next(ApiError.ValidationError(VALIDATION_DEFAULT_MESSAGE));
        return;
      }

      next(err);
    });
};

module.exports = {
  getUserMovies,
  saveMovie,
  deleteMovie,
};
