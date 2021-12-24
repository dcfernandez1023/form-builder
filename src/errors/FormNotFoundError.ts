class FormNotFoundError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "Form not found";
    }
    Object.setPrototypeOf(this, FormNotFoundError.prototype);
  }
}


export { FormNotFoundError };
