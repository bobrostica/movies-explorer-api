const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const ApiError = require('../errors/ApiError');
const { WRONG_CREDENTIALS_MESSAGE } = require('../utils/constants');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    name: {
      type: String,
      required: true,
      minLength: 2,
      maxLength: 30,
    },
  },
  {
    versionKey: false,
    // Строка toJSON ниже скрывает password из результата User.create
    // toObject: { useProjection: true },
    toJSON: { useProjection: true },
  },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials({
  email,
  password,
}) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw ApiError.AuthenticationError(WRONG_CREDENTIALS_MESSAGE);
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw ApiError.AuthenticationError(WRONG_CREDENTIALS_MESSAGE);
        }

        return user;
      });
    });
};

module.exports = mongoose.model('user', userSchema);
