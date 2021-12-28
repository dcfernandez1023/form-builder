import { CustomError } from "./CustomError";
const { UNAUTHORIZED } = require('http-status-codes');


class EmailOrPasswordInvalidError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Invalid username or password" : message, UNAUTHORIZED);
    Object.setPrototypeOf(this, EmailOrPasswordInvalidError.prototype);
  }
}


export { EmailOrPasswordInvalidError };
