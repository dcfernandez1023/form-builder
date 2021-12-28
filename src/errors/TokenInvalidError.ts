import { CustomError } from "./CustomError";
const { UNAUTHORIZED } = require('http-status-codes');


class TokenInvalidError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Token invalid" : message, UNAUTHORIZED);
    Object.setPrototypeOf(this, TokenInvalidError.prototype);
  }
}


export { TokenInvalidError };
