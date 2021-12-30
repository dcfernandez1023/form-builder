import { CustomError } from "./CustomError";
const { INTERNAL_SERVER_ERROR } = require('http-status-codes');


class EmailSendError extends CustomError {
  constructor(message?: string, statusCode?: number) {
    super(message === undefined ? "Failed to send email" : message, INTERNAL_SERVER_ERROR);
    Object.setPrototypeOf(this, EmailSendError.prototype);
  }
}


export { EmailSendError };
