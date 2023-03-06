const errors = {
  InvalidErrorType: {
    message: "Invalid error type",
    statusCode: 500,
  },
  UserExists: {
    message: "User already exists",
    statusCode: 409,
  },
  WrongCredentials: {
    statusCode: 401,
    message: "Invalid username or password",
  },
  BadRequest: {
    statusCode: 400,
    message: "Bad Request",
  },
  Unknown: {
    statusCode: 500,
    message: "Unknown error",
  },
  AlreadyExists: {
    statusCode: 409,
    message: "The data already exists",
  },
  Unauthorized: {
    statusCode: 401,
    message: "Unauthorized",
  },
  NotFound: {
    statusCode: 404,
    message: "Not Found",
  },
  Forbidden: {
    statusCode: 403,
    message: "Forbidden",
  },
  InvalidURL: {
    statusCode: 422,
    message: "Invalid URL",
  },
  DBError: {
    statusCode: 500,
    message: "Something went wrong Check payload for more info",
  },
  APIError: {
    statusCode: 500,
    message: "Something went wrong Check payload for more info",
  },
};

export default class BaseError extends Error {
  public statusCode: number;

  constructor(errName: keyof typeof errors, message?: string) {
    const error = errors[errName];

    super(message? message : error.message);
    this.statusCode = error.statusCode;
  }
}