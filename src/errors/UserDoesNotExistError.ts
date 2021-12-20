class UserDoesNotExistError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "User does not exist";
    }
    Object.setPrototypeOf(this, UserDoesNotExistError.prototype);
  }
}


export { UserDoesNotExistError };
