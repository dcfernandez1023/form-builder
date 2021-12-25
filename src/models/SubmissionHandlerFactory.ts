import { SubmissionHandler } from "./SubmissionHandler";
import { EmailSubmissionHandler } from "./EmailSubmissionHandler";
import { RestSubmissionHandler } from "./RestSubmissionHandler";
import { GsheetSubmissionHandler } from "./GsheetSubmissionHandler";
import { json } from "./Json";


class SubmissionHandlerFactory {
  static getSubmissionHandler(config: json): SubmissionHandler | null {
    if(config.type === "Email") {
      return new EmailSubmissionHandler(config);
    }
    else if(config.type === "REST") {
      return new RestSubmissionHandler(config);
    }
    else if(config.type === "Gsheet") {
      return new GsheetSubmissionHandler(config);
    }
    return null;
  }
}


export { SubmissionHandlerFactory };
