import { json } from "./Json";
import { SubmissionHandler } from "./SubmissionHandler";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { GoogleSpreadsheet } from "google-spreadsheet";


class GsheetSubmissionHandler implements SubmissionHandler {
  type: string = "Gsheet";
  isEnabled: boolean = false;
  gsheetId: string = "";

  constructor(config: json) {
    if(!this.validateConfig(config)) {
      throw new InvalidFieldError("Invalid config for type " + this.type);
    }
    this.isEnabled = config.isEnabled;
    this.gsheetId = config.gsheetId;
  }

  getConfig(): json {
    return {type: this.type, isEnabled: this.isEnabled, gsheetId: this.gsheetId};
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
    config.gsheetId = config.gsheetId.trim();
    return true;
  }

  async executeSubmit(formId: string, formData: json[]) {
    if(!this.isEnabled) {
      return;
    }
    await this.addHeaders(formData);
    await this.writeRow(formData);
  }

  private async addHeaders(formData: json[]) {
    try {
      const doc = new GoogleSpreadsheet(this.gsheetId);
      let client_email: any = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      let private_key: any = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
      await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
      });
      await doc.loadInfo();
      var sheet = doc.sheetsByIndex[0];
      var headerRow = [];
      // Use to check duplicate headers
      let headers: json = {};
      for(var i: number = 0; i < formData.length; i++) {
        let header: string = "";
        if(formData[i].name.trim().length == 0) {
          header = "Element " + i.toString()
        }
        else {
          header = formData[i].name;
        }
        if(headers[header] !== undefined) {
          let count: number = headers[header];
          headers[header] = count + 1;
          header += " (" + count.toString() + ")";
        }
        else {
          headers[header] = 1;
        }
        headerRow.push(header);
      }
      if(headerRow.length == 0) {
        throw new InvalidFieldError("Cannot add empty headers");
      }
      else {
        sheet.setHeaderRow(headerRow);
      }
    }
    catch(error) {
      //throw new InvalidFieldError("Error: Could not access your Google Sheet. Either the sheet id you provided is invalid or you did not provide edit access to " + process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      throw(error);
    }
  };

  private async writeRow(formData: json[]) {
    try {
      const doc = new GoogleSpreadsheet(this.gsheetId);
      let client_email: any = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
      let private_key: any = process.env.GOOGLE_PRIVATE_KEY!.replace(/\\n/g, '\n');
      await doc.useServiceAccountAuth({
        client_email: client_email,
        private_key: private_key,
      });
      await doc.loadInfo();
      var sheet = doc.sheetsByIndex[0];
      let values: string[] = [];
      for(var i: number = 0; i < formData.length; i++) {
        values.push(formData[i].value);
      }
      sheet.addRow(values);
    }
    catch(error) {
      //throw new InvalidFieldError("Error: Could not access your Google Sheet. Either the sheet id you provided is invalid or you did not provide edit access to " + process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL);
      throw(error);
    }
  }
}


export { GsheetSubmissionHandler };
