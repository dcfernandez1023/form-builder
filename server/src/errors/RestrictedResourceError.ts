import { CustomError } from "./CustomError";
const { UNAUTHORIZED } = require('http-status-codes');


class RestrictedResourceError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Not authorized to access this resource" : message, UNAUTHORIZED);
    Object.setPrototypeOf(this, RestrictedResourceError.prototype);
  }
}


export { RestrictedResourceError };
