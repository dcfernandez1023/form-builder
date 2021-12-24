import { json } from "./Json";


interface SubmissionHandler {
  type: string;
  isEnabled: boolean;

  getConfig(): json;
  validateConfig(config: json): boolean;
  async executeSubmit(formId: string, formData: json);
}


export { SubmissionHandler };
