import { SubmissionHandler } from "./SubmissionHandler";
import { EmailSubmissionHandler } from "./EmailSubmissionHandler";
import { json } from "./Json";


class SubmissionHandlerFactory {
  static getSubmissionHandler(config: json): SubmissionHandler | null {
    if(config.type === "Email") {
      return new EmailSubmissionHandler(config);
    }
    return null;
  }
}


export { SubmissionHandlerFactory };
