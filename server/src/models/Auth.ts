import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { EmailOrPasswordInvalidError } from "../errors/EmailOrPasswordInvalidError";
import { EmailSendError } from "../errors/EmailSendError";
import { TokenInvalidError } from "../errors/TokenInvalidError";
import { cf } from "./data_access/CloudFirestore";
import { json } from "./Json";
import { EmailSender } from "./EmailSender";
import { User } from "./User";
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


class Auth {
  static async register(userId: string, email: string, password: string): Promise<string> {
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const userCredentials = {id: userId, email: email, password: hashedPassword};
    cf.insert(userId, "credentials", userCredentials);
    return Auth.generateAccessToken(userCredentials.id);
  }

  static async registerVerify(email: string) {
    if(await User.doesUserExist(email)) {
      throw new UserAlreadyExistsError();
    }
    let accessToken: string = Auth.generateAccessToken(email);
    await EmailSender.sendEmail(
      [email],
      "Verification Code",
      "Verification code: " + accessToken
    );
  }

  static async login(email: string, password: string): Promise<string> {
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new EmailOrPasswordInvalidError();
    }
    if(!await bcrypt.compare(password, userCredentials[0].password)) {
      throw new EmailOrPasswordInvalidError();
    }
    return Auth.generateAccessToken(userCredentials[0].id);
  }

  static async userIdLogin(userId: string, password: string): Promise<string> {
    let userCredentials: json[] = await cf.getByFilter("credentials", "id", "==", userId);
    if(userCredentials.length != 1) {
      throw new EmailOrPasswordInvalidError();
    }
    if(!await bcrypt.compare(password, userCredentials[0].password)) {
      throw new EmailOrPasswordInvalidError();
    }
    return Auth.generateAccessToken(userCredentials[0].id);
  }

  static async sendForgotPasswordEmail(email: string) {
    // let cf: CloudFirestore = new CloudFirestore();
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new UserDoesNotExistError();
    }
    await EmailSender.sendEmail(
      [email],
      "Forgot password",
      "Verification code: " + Auth.generateAccessToken(userCredentials[0].id)
    );
  }

  static async refreshAccessToken(userId: string, accessToken: string): Promise<string> {
    if(!Auth.validateAccessToken(accessToken)) {
      throw new TokenInvalidError();
    }
    return Auth.generateAccessToken(userId);
  }

  static async resetPassword(email: string, newPassword: string, token: string): Promise<string> {
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new UserDoesNotExistError();
    }
    if(!Auth.validateAccessToken(token)) {
      throw new TokenInvalidError();
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    const updateData = {password: hashedPassword};
    cf.update(userCredentials[0].id, "credentials", updateData);
    return Auth.refreshAccessToken(userCredentials[0].id, token);
  }

  static decodeAccessToken(accessToken: string): string {
    try {
      var ca: string = accessToken;
      var base64Url: string = ca.split('.')[1];
      let payload: json = JSON.parse(Buffer.from(base64Url, 'base64').toString());
      return payload.id === undefined ? "" : payload.id;
    }
    catch(error: any) {
      return "";
    }
  }

  static validateAccessToken(accessToken: string): boolean {
    try {
      return jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
    }
    catch(error: any) {
      return false;
    }
  }

  static generateAccessToken(userId: string): string {
    return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
  }

  static async validateRegistrationToken(verificationToken: string, email: string): Promise<boolean> {
    try {
      if(!Auth.validateAccessToken(verificationToken) || Auth.decodeAccessToken(verificationToken) !== email) {
        throw new TokenInvalidError();
      }
      if(await User.doesUserExist(email)) {
        throw new UserAlreadyExistsError();
      }
      return true;
    }
    catch(error: any) {
      return false;
    }
  }
}

export { Auth };
