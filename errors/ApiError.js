module.exports = class ApiError extends Error {
  constructor(status, message) {
    super(message);
    this.statusCode = status;
  }

  static AuthenticationError(message) {
    return new ApiError(401, message);
  }

  static ConflictError(message) {
    return new ApiError(409, message);
  }

  static ForbiddenError(message) {
    return new ApiError(403, message);
  }

  static NotFoundError(message) {
    return new ApiError(404, message);
  }

  static ValidationError(message) {
    return new ApiError(400, message);
  }
};
