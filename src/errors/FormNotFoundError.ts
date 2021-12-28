import { CustomError } from "./CustomError";
const { NOT_FOUND } = require('http-status-codes');


class FormNotFoundError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Form not found" : message, NOT_FOUND);
    Object.setPrototypeOf(this, FormNotFoundError.prototype);
  }
}


export { FormNotFoundError };
