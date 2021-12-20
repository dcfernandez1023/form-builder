class UserAlreadyExistsError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "User already exists";
    }
    Object.setPrototypeOf(this, UserAlreadyExistsError.prototype);
  }
}


export { UserAlreadyExistsError };
