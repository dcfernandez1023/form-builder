import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { UserDoesNotExistError } from "../errors/UserDoesNotExistError";
import { EmailOrPasswordInvalidError } from "../errors/EmailOrPasswordInvalidError";
import { EmailSendError } from "../errors/EmailSendError";
import { TokenInvalidError } from "../errors/TokenInvalidError";
import { CloudFirestore } from "./data_access/CloudFirestore";
import { json } from "./Json";
import { EmailSender } from "./EmailSender";
const bcrypt = require ('bcrypt');
const jwt = require("jsonwebtoken");
require("dotenv").config();


class Auth {
  async register(userId: string, email: string, password: string): Promise<string> {
    let cf: CloudFirestore = new CloudFirestore();
    const hashedPassword: string = await bcrypt.hash(password, 10);
    const userCredentials = {id: userId, email: email, password: hashedPassword};
    cf.insert(userId, "credentials", userCredentials);
    return this.generateAccessToken(userCredentials.id);
  }

  async login(email: string, password: string): Promise<string> {
    let cf: CloudFirestore = new CloudFirestore();
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new UserDoesNotExistError();
    }
    if(!await bcrypt.compare(password, userCredentials[0].password)) {
      throw new EmailOrPasswordInvalidError();
    }
    return this.generateAccessToken(userCredentials[0].id);
  }

  async sendForgotPasswordEmail(email: string) {
    let cf: CloudFirestore = new CloudFirestore();
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new UserDoesNotExistError();
    }
    await EmailSender.sendEmail(
      [email],
      "Forgot password",
      "Verification code: " + this.generateAccessToken(userCredentials[0].id)
    );
  }

  async refreshAccessToken(userId: string, accessToken: string): Promise<string> {
    if(!this.validateAccessToken(userId, accessToken)) {
      throw new TokenInvalidError();
    }
    return this.generateAccessToken(userId);
  }

  async resetPassword(email: string, newPassword: string, token: string) {
    let cf: CloudFirestore = new CloudFirestore();
    let userCredentials: json[] = await cf.getByFilter("credentials", "email", "==", email);
    if(userCredentials.length != 1) {
      throw new UserDoesNotExistError();
    }
    if(!this.validateAccessToken(userCredentials[0].id, token)) {
      throw new TokenInvalidError();
    }
    const hashedPassword: string = await bcrypt.hash(newPassword, 10);
    const updateData = {password: hashedPassword};
    cf.update(userCredentials[0].id, "credentials", updateData);
  }

  validateAccessToken(userId: string, accessToken: string): boolean {
    try {
      // throws exception if accessToken is not valid
      var ca: string = accessToken;
      var base64Url: string = ca.split('.')[1];
      let payload: json = JSON.parse(Buffer.from(base64Url, 'base64').toString());
      return (
        jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET) &&
        payload.id === userId
      );
      // return true;
    }
    catch(error: any) {
      return false;
    }
  }

  private generateAccessToken(userId: string): string {
    return jwt.sign({id: userId}, process.env.ACCESS_TOKEN_SECRET, {expiresIn: "30m"});
  }
}

export { Auth };
