const mongoose = require('mongoose');
const validator = require('validator');

const ApiError = require('../errors/ApiError');
const { MOVIE_NOT_FOUND_MESSAGE } = require('../utils/constants');

// Следуя заданию, movieId не делаю unique, но очень хочется)
const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    duration: {
      type: Number,
      required: true,
    },
    year: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    trailerLink: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    thumbnail: {
      type: String,
      required: true,
      validate: validator.isURL,
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'user',
    },
    movieId: {
      type: Number,
      required: true,
    },
    nameRU: {
      type: String,
      required: true,
    },
    nameEN: {
      type: String,
      required: true,
    },
  },
  { versionKey: false },
);

movieSchema.statics.isUserOwner = function isUserOwner({ userId, movieId }) {
  return this.findOne({ _id: movieId }).then((movie) => {
    if (!movie) {
      throw ApiError.NotFoundError(MOVIE_NOT_FOUND_MESSAGE);
    }

    if (movie.owner.toString() === userId) {
      return true;
    }

    return false;
  });
};

module.exports = mongoose.model('movie', movieSchema);
