import { CustomError } from "./CustomError";
const { UNSUPPORTED_MEDIA_TYPE } = require('http-status-codes');


class InvalidFieldError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Invalid or empty fields" : message, UNSUPPORTED_MEDIA_TYPE);
    Object.setPrototypeOf(this, InvalidFieldError.prototype);
  }
}


export { InvalidFieldError };
