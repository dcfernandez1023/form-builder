import { CustomError } from "./CustomError";
const { NOT_FOUND } = require('http-status-codes');


class UserDoesNotExistError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "User does not exist" : message, NOT_FOUND);
    Object.setPrototypeOf(this, UserDoesNotExistError.prototype);
  }
}


export { UserDoesNotExistError };
