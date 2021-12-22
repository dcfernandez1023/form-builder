import { CloudFirestore } from "./data_access/CloudFirestore";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { json } from "./Json";
import { v4 as uuidv4 } from 'uuid';
import * as FormElements from "./formElements";


class Form {
  id: string;
  userId: string;
  title: string;
  dateCreated: number;
  lastModified: number;
  isPublished: boolean
  accessKey: string;
  elements: json[];
  submissions: number[];
  submissionHandlers: json;
  protectedFields: string[] = [
    "id",
    "userId",
    "dateCreated",
    "submissions"
  ];

  constructor() {
    this.id = "";
    this.userId = "";
    this.title = "";
    this.dateCreated = 0;
    this.lastModified = 0;
    this.isPublished = false;
    this.accessKey = "";
    this.elements = [];
    this.submissions = [];
    this.submissionHandlers = {};
  }

  static async createNew(userId: string, title: string): Promise<json> {
    let date: Date = new Date();
    let cf: CloudFirestore = new CloudFirestore();
    let userData = await cf.getByFilter("users", "id", "==", userId);
    if(userData.length != 1) {
      throw new UserDoesNotExistError();
    }
    let newForm: json = {
      id: uuidv4().toString(),
      userId: userId,
      title: title,
      dateCreated: date.getTime(),
      lastModified: date.getTime(),
      isPublished: false,
      accessKey: "",
      elements: [],
      submissions: [],
      submissionHandlers: []
    };
    return await cf.insert(newForm.id, "forms", newForm);
  }

  async getByUserId(userId: string): Promise<json[]> {
    let cf: CloudFirestore = new CloudFirestore();
    return await cf.getByFilter("forms", "userId", "==", userId);
  }

  async getByFormId(id: string): Promise<json> {
    let cf: CloudFirestore = new CloudFirestore();
    let formData: json[] = await cf.getByFilter("forms", "id", "==", id);
    if(formData.length != 1) {
      return {};
    }
    return formData[0];
  }

  async updateFields(id: string, fields: json): Promise<json> {
    let cf: CloudFirestore = new CloudFirestore();
    if(!this.validateFields(fields)) {
      throw new InvalidFieldError();
    }
    return await cf.update(id, "forms", fields);
  }

  async delete(id: string): Promise<string> {
    let cf: CloudFirestore = new CloudFirestore();
    return await cf.delete(id, "forms");
  }

  private validateFields(fields: json): boolean {
    for(var key in fields) {
      if(key === "elements") {
        if(!this.validateElements(fields[key])) {
          return false;
        }
      }
      else if(this.protectedFields.includes(key)) {
        delete fields[key];
      }
      else if(!this.hasOwnProperty(key) || typeof (this as json)[key] !== typeof fields[key]) {
        return false;
      }
    }
    return true;
  }

  private validateElements(elements: json[]): boolean {
    for(var i: number = 0; i < elements.length; i++) {
      let element: json = elements[i];
      let elementSchema: json = FormElements.elements[element.type];
      if(elementSchema === undefined) {
        return false;
      }
      if(Object.keys(element).length != Object.keys(elementSchema).length) {
        return false;
      }
      // Validate input, radio, and textarea elements
      if(element.type === "INPUT" || element.type === "RADIO" || element.type === "TEXTAREA") {
        for(var field in element) {
          if(elementSchema[field] === undefined || typeof element[field] !== typeof elementSchema[field]) {
            return false;
          }
        }
      }
      // Validate select element
      else if(element.type === "SELECT") {
        for(var field in element) {
          if(field === "options") {
            let optionSchema = FormElements.selectOption;
            let len = Object.keys(optionSchema).length;
            for(var x: number = 0; x < element[field].length; x++) {
              let option = element[field][i];
              if(Object.keys(option).length != len) {
                return false;
              }
              for(var optionKey in option) {
                if(optionSchema[optionKey] === undefined || typeof option[optionKey] !== typeof optionSchema[optionKey]) {
                  return false;
                }
              }
            }
          }
          else if(elementSchema[field] === undefined || typeof element[field] !== typeof elementSchema[field]) {
            return false;
          }
        }
      }
    }
    return true;
  }
}


export { Form };
