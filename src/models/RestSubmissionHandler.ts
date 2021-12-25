import { json } from "./Json";
import { SubmissionHandler } from "./SubmissionHandler";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import axios from "axios";


class RestSubmissionHandler implements SubmissionHandler {
  type: string = "REST";
  isEnabled: boolean = false;
  endpoint: string = "";

  constructor(config: json) {
    if(!this.validateConfig(config)) {
      throw new InvalidFieldError("Invalid config for type " + this.type);
    }
    this.isEnabled = config.isEnabled;
    this.endpoint = config.endpoint;
  }

  getConfig(): json {
    return {type: this.type, isEnabled: this.isEnabled, endpoint: this.endpoint};
  }

  validateConfig(config: json): boolean {
    if(config.type === undefined || config.type !== this.type) {
      return false;
    }
    if(Object.keys(config).length != Object.keys((this as json)).length) {
      return false;
    }
    for(var key in config) {
      if(!this.hasOwnProperty(key) || typeof (this as json)[key] !== typeof config[key]) {
        return false;
      }
    }
    return true;
  }

  async executeSubmit(formId: string, formData: json[]) {
    if(!this.isEnabled) {
      return;
    }
    await axios.post(this.endpoint, formData);
  }
}


export { RestSubmissionHandler };
