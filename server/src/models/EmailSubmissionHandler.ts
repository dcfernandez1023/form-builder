import { json } from "./Json";
import { SubmissionHandler } from "./SubmissionHandler";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { EmailSender } from "./EmailSender";


class EmailSubmissionHandler implements SubmissionHandler {
  type: string = "Email";
  isEnabled: boolean = false;
  receivers: string = "";

  constructor(config: json) {
    if(!this.validateConfig(config)) {
      throw new InvalidFieldError("Invalid config for type " + this.type);
    }
    this.isEnabled = config.isEnabled;
    this.receivers = config.receivers;
  }

  getConfig(): json {
    return {type: this.type, isEnabled: this.isEnabled, receivers: this.receivers};
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
    config.receivers = config.receivers.trim();
    return true;
  }

  async executeSubmit(formId: string, formData: json[]) {
    if(!this.isEnabled) {
      return;
    }
    let html: string = "<table>";
    // Create header row
    html += "<tr>";
    for(var i: number = 0; i < formData.length; i++) {
      html += "<th>" + formData[i].name + "</th>";
    }
    html += "</tr>";
    // Create value rows
    html += "<tr>";
    for(var i: number = 0; i < formData.length; i++) {
      html += "<td>" + formData[i].value + "</td>";
    }
    html += "</tr>";
    html += "</table>";
    await EmailSender.sendEmail([this.receivers], "Form submission " + new Date().toLocaleDateString(), JSON.stringify(formData), html);
  }
}


export { EmailSubmissionHandler };
