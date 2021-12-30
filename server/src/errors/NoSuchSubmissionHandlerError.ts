import { CustomError } from "./CustomError";
const { UNSUPPORTED_MEDIA_TYPE } = require('http-status-codes');


class NoSuchSubmissionHandlerError extends CustomError {
  constructor(type: string, statusCode?: number) {
    super("No such submission handler " + type, UNSUPPORTED_MEDIA_TYPE);
    Object.setPrototypeOf(this, NoSuchSubmissionHandlerError.prototype);
  }
}


export { NoSuchSubmissionHandlerError };
