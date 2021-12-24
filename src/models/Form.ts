import { CloudFirestore } from "./data_access/CloudFirestore";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { FormNotFoundError } from "../errors/FormNotFoundError";
import { NoSuchSubmissionHandlerError } from "../errors/NoSuchSubmissionHandlerError";
import { json } from "./Json";
import { v4 as uuidv4 } from 'uuid';
import * as FormElements from "./formElements";
import { SubmissionHandler } from "./SubmissionHandler";
import { EmailSubmissionHandler } from "./EmailSubmissionHandler";
import { SubmissionHandlerFactory } from "./SubmissionHandlerFactory";


class Form {
  id: string;
  userId: string;
  title: string;
  dateCreated: number;
  lastModified: number;
  isPublished: boolean
  accessKey: string;
  elements: json[];
  submissions: json[];
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
    let updateBody: json = this.validateFields(fields);
    if(Object.keys(updateBody).length == 0) {
      throw new InvalidFieldError();
    }
    await cf.update(id, "forms", updateBody);
    return fields;
  }

  async delete(id: string): Promise<string> {
    let cf: CloudFirestore = new CloudFirestore();
    return await cf.delete(id, "forms");
  }

  async handleSubmit(formId: string, formSubmission: json): Promise<json> {
    let cf: CloudFirestore = new CloudFirestore();
    let formData: json[] = await cf.getByFilter("forms", "id", "==", formId);
    if(formData.length != 1) {
      throw new FormNotFoundError();
    }
    let form = formData[0];
    // Check that formData matches form's elements
    /*
      formData should be in the format: {id: {name: <string>, value: <string>}}
    */
    let parsedFormData: json[] = [];
    for(var i: number = 0; i < form.elements.length; i++) {
      let elementId: string = form.elements[i].id;
      if(formSubmission[elementId] === undefined || formSubmission[elementId].name === undefined || formSubmission[elementId].value === undefined) {
        throw new InvalidFieldError("Form submission data is not formatted correctly");
      }
      parsedFormData.push({id: elementId, name: formSubmission[elementId].name, value: formSubmission[elementId].value});
    }
    let errors: json[] = [];
    for(var i: number = 0; i < form.submissionHandlers.length; i++) {
      let config: json = form.submissionHandlers[i];
      try {
        let handler: SubmissionHandler | null = SubmissionHandlerFactory.getSubmissionHandler(config);
        if(handler === null) {
          throw new NoSuchSubmissionHandlerError(config.type);
        }
        await handler.executeSubmit(formId, parsedFormData);
      }
      catch(error: any) {
        errors.push({type: config.type, error: error.message});
      }
    }
    form.submissions.push({
      timestamp: new Date().getTime(),
      submissionErrors: errors,
      data: parsedFormData
    });
    return {submissionErrors: errors, form: form};
  }

  private validateFields(fields: json): json {
    let updateBody: json = {};
    for(var key in fields) {
      if(key === "elements") {
        if(!this.validateElements(fields[key])) {
          return {};
        }
      }
      else if(key === "submissionHandlers") {
        if(!this.validateSubmissionHandlers(fields[key])) {
          return {};
        }
      }
      else if(this.protectedFields.includes(key)) {
        continue;
      }
      else if(!this.hasOwnProperty(key) || typeof (this as json)[key] !== typeof fields[key]) {
        return {};
      }
      updateBody[key] = fields[key];
    }
    return updateBody;
  }

  private validateElements(elements: json[]): boolean {
    let elementIds: json = {};
    for(var i: number = 0; i < elements.length; i++) {
      let element: json = elements[i];
      let elementSchema = FormElements.elements[element.type];
      if(elementSchema === undefined) {
        throw new InvalidFieldError(element.type + " is not a valid element type");
      }
      if(Object.keys(element).length != Object.keys(elementSchema).length) {
        return false;
      }
      // Validate columns field
      if(element.columns < 0 || element.columns > 12) {
        throw new InvalidFieldError("Element columns must be between 0 and 12");
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
              let option = element[field][x];
              if(Object.keys(option).length != len) {
                throw new InvalidFieldError("Invalid option for select element");
              }
              // Check that the select element's options have correct schema
              for(var optionKey in option) {
                if(optionSchema[optionKey] === undefined || typeof option[optionKey] !== typeof optionSchema[optionKey]) {
                  throw new InvalidFieldError("Invalid option for select element");
                }
              }
            }
          }
          else if(elementSchema[field] === undefined || typeof element[field] !== typeof elementSchema[field]) {
            return false;
          }
        }
      }
      // Check for duplicate ids
      if(element.id.trim().length == 0) {
        element.id = uuidv4().toString();
      }
      if(elementIds[element.id] !== undefined) {
        throw new InvalidFieldError("Duplicate element ids");
      }
      else {
        elementIds[element.id] = true;
      }
    }
    return true;
  }

  private validateSubmissionHandlers(handlers: json[]): boolean {
    let handlerTypes: json = {};
    for(var i: number = 0; i < handlers.length; i++) {
      let config: json = handlers[i];
      let handler: SubmissionHandler | null = SubmissionHandlerFactory.getSubmissionHandler(config);
      if(handler === null) {
        throw new NoSuchSubmissionHandlerError(config.type);
      }
      if(!handler.validateConfig(config)) {
        return false;
      }
      // Check duplicates types
      if(handlerTypes[handler.type] !== undefined) {
        throw new InvalidFieldError("Duplicate submission handler");
      }
      else {
        handlerTypes[handler.type] = true;
      }
    }
    return true;
  }
}


export { Form };
