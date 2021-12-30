const { INTERNAL_SERVER_ERROR } = require('http-status-codes');


abstract class CustomError extends Error {
  message: string;
  statusCode: number;

  constructor(message?: string, statusCode?: number) {
    super(message);
    this.message = message === undefined ? "Oops... An unexpected error occurred" : message;
    this.statusCode = statusCode === undefined ? INTERNAL_SERVER_ERROR : statusCode;
  }
}


export { CustomError };
