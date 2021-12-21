class TokenInvalidError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "Invalid access token";
    }
    Object.setPrototypeOf(this, TokenInvalidError.prototype);
  }
}


export { TokenInvalidError };
