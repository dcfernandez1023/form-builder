class NoSuchSubmissionHandlerError extends Error {
  message: string;

  constructor(handlerType: string) {
    let message: string = "No such submission handler " + handlerType;
    super(message);
    this.message = message;
    Object.setPrototypeOf(this, NoSuchSubmissionHandlerError.prototype);
  }
}


export { NoSuchSubmissionHandlerError };
