import { Form } from "../models/Form";
import { Auth } from "../models/Auth";
import { json } from "../models/Json";
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { ACCESS_TOKEN, SUCCESS_MESSAGE } = require("./constants");


/**
  * Type: POST
  * Required headers: {accessToken: <string>}
  * JSON body: {title: <string>}
*/
module.exports.createNew = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let body = req.body;
    let newForm = await Form.createNew(userId, body.title);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(newForm);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: GET
  * Required headers: {accessToken: <string>}
  * JSON body: {}
*/
module.exports.getForms = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let form: Form = new Form();
    let userForms: json[] = await form.getByUserId(userId);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(userForms);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: GET
  * Required URL parameters: formId
  * JSON body: {}
*/
module.exports.getPublishedForm = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let formId: string = req.params.formId;
    let form: Form = new Form();
    let formData: json = await form.getPublishedForm(formId);
    return res.status(OK).json(formData);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: GET
  * Required URL parameters: formId
  * Required headers: {accessToken: <string>}
  * JSON body: {}
*/
module.exports.getForm = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let formId: string = req.params.formId;
    let form: Form = new Form();
    let formData: json = await form.getByFormId(formId, userId);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(formData);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * Required URL parameters: formId
  * Required headers: {accessToken: <string>}
  * JSON body: {fields: <json>}
*/
module.exports.updateFields = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let formId: string = req.params.formId;
    let body = req.body;
    let form: Form = new Form();
    let updateRes = await form.updateFields(userId, formId, body.fields);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(updateRes);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: DELETE
  * Required URL parameters: formId
  * Required headers: {accessToken: <string>}
  * JSON body: {}
*/
module.exports.delete = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let formId: string = req.params.formId;
    let form: Form = new Form();
    let deletedId: string = await form.delete(userId, formId);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json({deletedId: deletedId});
  }
  catch(error: any) {
    next(error);
  }
}


/**
  * Type: POST
  * Required URL parameters: formId
  * JSON body: {formSubmission: <json>}
*/
module.exports.handleSubmit = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let formId: string = req.params.formId;
    let body = req.body;
    let form: Form = new Form();
    let submissionRes: json = await form.handleSubmit(formId, body.formSubmission);
    return res.status(OK).json(submissionRes);
  }
  catch(error: any) {
    next(error);
  }
}
