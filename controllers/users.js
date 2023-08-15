const mongoose = require('mongoose');
const { MongoServerError } = require('mongodb');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../utils/config');
const User = require('../models/user');

const ApiError = require('../errors/ApiError');
const {
  MAX_TOKEN_AGE,
  MAX_COOKIE_TOKEN_AGE,
  TOKEN_NAME,
  CONFLICT_EMAIL_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  VALIDATION_DEFAULT_MESSAGE,
  SIGNOUT_MESSAGE,
  MONGO_NON_UNIQUE_ERROR_CODE,
} = require('../utils/constants');

const registerUser = (req, res, next) => {
  const { email, password, name } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) =>
      User.create({
        email,
        password: hash,
        name,
      }),
    )
    .then((user) => res.send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(ApiError.ValidationError(VALIDATION_DEFAULT_MESSAGE));
        return;
      }

      if (
        err instanceof MongoServerError &&
        err.code === MONGO_NON_UNIQUE_ERROR_CODE
      ) {
        next(ApiError.ConflictError(CONFLICT_EMAIL_MESSAGE));
        return;
      }

      next(err);
    });
};

const loginUser = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials({ email, password })
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: MAX_TOKEN_AGE,
      });
      res
        .cookie(TOKEN_NAME, token, {
          maxAge: MAX_COOKIE_TOKEN_AGE,
          httpOnly: true,
          sameSite: true,
        })
        .send(user);
    })
    .catch(next);
};

const logOutUser = (req, res) => {
  res
    .clearCookie(TOKEN_NAME, {
      httpOnly: true,
      sameSite: true,
    })
    .send({ message: SIGNOUT_MESSAGE });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => res.send(user))
    .catch(next);
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(
    userId,
    { name, email },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (!user) {
        next(ApiError.NotFoundError(USER_NOT_FOUND_MESSAGE));
        return;
      }
      res.send(user);
    })
    .catch((err) => {
      if (
        err instanceof mongoose.Error.CastError ||
        err instanceof mongoose.Error.ValidationError
      ) {
        next(ApiError.ValidationError(VALIDATION_DEFAULT_MESSAGE));
        return;
      }

      if (
        err instanceof MongoServerError &&
        err.code === MONGO_NON_UNIQUE_ERROR_CODE
      ) {
        next(ApiError.ConflictError(CONFLICT_EMAIL_MESSAGE));
        return;
      }

      next(err);
    });
};

module.exports = {
  registerUser,
  loginUser,
  logOutUser,
  getCurrentUser,
  updateUser,
};
