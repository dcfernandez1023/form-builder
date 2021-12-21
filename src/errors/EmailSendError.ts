class EmailSendError extends Error {
  message: string;

  constructor(message?: string) {
    super(message);
    if(typeof message !== "undefined") {
      this.message = message;
    }
    else {
      this.message = "Failed to send email";
    }
    Object.setPrototypeOf(this, EmailSendError.prototype);
  }
}


export { EmailSendError };
