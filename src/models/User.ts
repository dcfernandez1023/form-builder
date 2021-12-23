/*
  Most methods of this class are async. It is the responsibility of the caller
  to either call the methods inside of another async function or to use
  the built-in then() function to handle the Promises returned by the async
  methods.
**/

import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { Auth } from "./Auth";
import { CloudFirestore } from "./data_access/CloudFirestore";
import { json } from "./Json";
import { v4 as uuidv4 } from 'uuid';


class User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  dateCreated: number;
  protectedFields: string[] = [
    "id",
    "dateCreated"
  ]

  constructor() {
    this.id = "";
    this.email = "";
    this.firstName = "";
    this.lastName = "";
    this.dateCreated = 0;
  }

  async updateFields(id: string, fields: json): Promise<json> {
    let cf = new CloudFirestore();
    if(fields.email !== undefined) {
      if(await User.doesUserExist(fields.email)) {
        throw new UserAlreadyExistsError();
      }
    }
    let updateBody: json = this.validateFields(fields);
    if(Object.keys(updateBody).length == 0) {
      throw new InvalidFieldError();
    }
    if(fields.email !== undefined) {
      cf.update(id, "credentials", {email: fields.email});
    }
    await cf.update(id, "users", updateBody);
    return fields;
  }

  async delete(userId: string, password: string): Promise<string> {
    let cf: CloudFirestore = new CloudFirestore();
    await cf.delete(userId, "users");
    return await cf.delete(userId, "credentials");
  }

  static async createNew(email: string, password: string, firstName: string, lastName: string): Promise<json> {
    let auth: Auth = new Auth();
    let cf: CloudFirestore = new CloudFirestore();
    if(await User.doesUserExist(email)) {
      throw new UserAlreadyExistsError();
    }
    let id:string = uuidv4().toString();
    await auth.register(id, email, password);
    return await cf.insert(id, "users", {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateCreated: new Date().getTime()
    });
  }

  async getUserByEmail(email: string): Promise<json> {
    let userData: json[] = await new CloudFirestore().getByFilter("users", "email", "==", email);
    if(userData.length != 1) {
      return {};
    }
    return userData[0];
  }

  async toJson(id: string): Promise<json> {
    let user: json = await this.getUserInfo(id);
    return user;
  }

  private validateFields(fields: json): json {
    let updateBody: json = {};
    for(var key in fields) {
      if(this.protectedFields.includes(key)) {
        continue;
      }
      if(!this.hasOwnProperty(key) || typeof (this as json)[key] !== typeof fields[key]) {
        return {};
      }
      updateBody[key] = fields[key];
    }
    return updateBody;
  }

  private async getUserInfo(id: string): Promise<json> {
    let cf: CloudFirestore = new CloudFirestore();
    let userData: json[] = await cf.getByFilter("users", "id", "==", id);
    if(userData.length != 1) {
      return {};
    }
    return userData[0];
  }

  private static async doesUserExist(email: string): Promise<boolean> {
    let cf: CloudFirestore = new CloudFirestore();
    let currentUserData: json[] = await cf.getByFilter("users", "email", "==", email);
    let credentialsData: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(currentUserData.length > 0 || credentialsData.length > 0) {
      return true;
    }
    return false;
  }
}


export { User };
