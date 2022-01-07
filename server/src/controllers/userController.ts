import { User } from "../models/User";
import { Auth } from "../models/Auth";
import { json } from "../models/Json";
const { OK, INTERNAL_SERVER_ERROR } = require('http-status-codes');
const { ACCESS_TOKEN, SUCCESS_MESSAGE } = require("./constants");


/**
  Type: POST
  JSON body: {email: <string>}
*/
module.exports.registerVerify = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let body = req.body;
    await Auth.registerVerify(body.email);
    return res.status(OK).json({});
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * JSON body: {email: <string>, password: <string>, firstName: <string>, lastName: <string>, verificationToken: <string>}
*/
module.exports.register = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let body = req.body;
    Auth.validateRegistrationToken(body.verificationToken, body.email, next);
    let newUser: json = await User.createNew(body.email, body.password, body.firstName, body.lastName);
    res.set(ACCESS_TOKEN, Auth.generateAccessToken(newUser.id));
    return res.status(OK).json(newUser);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * JSON body: {email: <string>, password: <string>}
*/
module.exports.login = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let body = req.body;
    let accessToken: string = await Auth.login(body.email, body.password);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(SUCCESS_MESSAGE);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * JSON body: {email: <string>}
*/
module.exports.sendForgotPasswordEmail = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let body = req.body;
    await Auth.sendForgotPasswordEmail(body.email);
    return res.status(OK).json(SUCCESS_MESSAGE);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * Required headers: {accessToken: <string>}
  * JSON body: {}
*/
module.exports.refreshAccessToken = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(SUCCESS_MESSAGE);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * JSON body: {email: <string>, newPassword: <string>, verificationToken: <string>}
*/
module.exports.resetPassword = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let body = req.body;
    let accessToken: string = await Auth.resetPassword(body.email, body.newPassword, body.verificationToken);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(SUCCESS_MESSAGE);
  }
  catch(error: any) {
    next(error);
  }
}


/**
  * Controller methods below execute the logic in the following order:
    * Verify that accessToken is valid
    * Decode the userId from the accessToken
    * Execute model object logic using the decoded userId and request body
    * Generate new accessToken and return the response
*/

/**
  * Type: POST
  * Required headers: {accessToken: <string>}
  * JSON body: {fields: <json>}
*/
module.exports.updateFields = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let body = req.body;
    let user = new User();
    let updatedUser = await user.updateFields(userId, body.fields);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(updatedUser);
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Type: POST
  * Required headers: {accessToken: <string>}
  * JSON body: {passowrd: <string>}
*/
module.exports.delete = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let body = req.body;
    let user = new User();
    let deletedId = await user.delete(userId, body.password);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json({id: deletedId});
  }
  catch(error: any) {
    next(error);
  }
}

/**
  * Required headers: {accessToken: <string>}
  * JSON body: {email: <string>}
*/
// module.exports.getUserByEmail = async (req: any, res: any, next: Function): Promise<any> => {
//   try {
//     let body = req.body;
//     let accessToken: string = await Auth.refreshAccessToken(body.userId, req.header(ACCESS_TOKEN));
//     let user = new User();
//     let userData = await user.getUserByEmail(body.userId, body.email);
//     res.set(ACCESS_TOKEN, accessToken);
//     return res.status(OK).json(userData);
//   }
//   catch(error: any) {
//     next(error);
//   }
// }

/**
  * Required headers: {accessToken: <string>}
  * JSON body: {}
*/
module.exports.getUserById = async (req: any, res: any, next: Function): Promise<any> => {
  try {
    let userId: string = Auth.decodeAccessToken(req.header(ACCESS_TOKEN));
    let accessToken: string = await Auth.refreshAccessToken(userId, req.header(ACCESS_TOKEN));
    let user = new User();
    let userData = await user.toJson(userId);
    res.set(ACCESS_TOKEN, accessToken);
    return res.status(OK).json(userData);
  }
  catch(error: any) {
    next(error);
  }
}
