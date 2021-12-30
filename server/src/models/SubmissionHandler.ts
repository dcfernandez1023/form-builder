import { json } from "./Json";


interface SubmissionHandler {
  type: string;
  isEnabled: boolean;

  getConfig(): json;
  validateConfig(config: json): boolean;
  executeSubmit(formId: string, formData: json): void;
}


export { SubmissionHandler };
