/*
  Most methods of this class are async. It is the responsibility of the caller
  to either call the methods inside of another async function or to use
  the built-in then() function to handle the Promises returned by the async
  methods.
**/

import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { InvalidFieldError } from "../errors/InvalidFieldError";
import { RestrictedResourceError } from "../errors/RestrictedResourceError";
import { Auth } from "./Auth";
import { cf } from "./data_access/CloudFirestore";
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

  /**
    * @param id The id of the user to update
    * @param fields The fields of the user to update. Must contain all of the
                    key-value pairs of the User's properties above. The key-value
                    pairs specified in the protectedFields property will not
                    be updated.
    * @return A Promise object that resolves to a json object containing the fields
              that were updated (which are all the fields except for the ones in protectedFields)
  */
  async updateFields(id: string, fields: json): Promise<json> {
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
    return updateBody;
  }

  async delete(userId: string, password: string): Promise<string> {
    let accessToken: string = await Auth.userIdLogin(userId, password);
    if(accessToken) {
      await cf.delete(userId, "users");
      return await cf.delete(userId, "credentials");
    }
    return "";
  }

  static async createNew(email: string, password: string, firstName: string, lastName: string): Promise<json> {
    // let cf: CloudFirestore = new CloudFirestore();
    if(await User.doesUserExist(email)) {
      throw new UserAlreadyExistsError();
    }
    let id:string = uuidv4().toString();
    await Auth.register(id, email, password);
    return await cf.insert(id, "users", {
      id: id,
      email: email,
      firstName: firstName,
      lastName: lastName,
      dateCreated: new Date().getTime()
    });
  }

  async getUserByEmail(userId: string, email: string): Promise<json> {
    let userData: json[] = await cf.getByFilters(
      "users",
      ["email", "id"],
      ["==", "=="],
      [email, userId]
    );
    if(userData.length != 1) {
      return {};
    }
    if(userId !== userData[0].id) {
      throw new RestrictedResourceError();
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
    // let cf: CloudFirestore = new CloudFirestore();
    let userData: json[] = await cf.getByFilter("users", "id", "==", id);
    if(userData.length != 1) {
      return {};
    }
    return userData[0];
  }

  private static async doesUserExist(email: string): Promise<boolean> {
    // let cf: CloudFirestore = new CloudFirestore();
    let currentUserData: json[] = await cf.getByFilter("users", "email", "==", email);
    let credentialsData: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(currentUserData.length > 0 || credentialsData.length > 0) {
      return true;
    }
    return false;
  }
}


export { User };
