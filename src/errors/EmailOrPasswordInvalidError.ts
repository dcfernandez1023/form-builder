class EmailOrPasswordInvalidError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "Invalid username or password";
    }
    Object.setPrototypeOf(this, EmailOrPasswordInvalidError.prototype);
  }
}


export { EmailOrPasswordInvalidError };
