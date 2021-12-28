import { CustomError } from "./CustomError";
const { CONFLICT } = require('http-status-codes');


class UserAlreadyExistsError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "User already exists" : message, CONFLICT);
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}


export { UserAlreadyExistsError };
