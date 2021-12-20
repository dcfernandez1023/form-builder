class InvalidFieldError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "Invalid json body";
    }
    Object.setPrototypeOf(this, InvalidFieldError.prototype);
  }
}


export { InvalidFieldError };
