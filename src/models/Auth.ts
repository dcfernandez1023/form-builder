import { UserAlreadyExistsError } from "../errors/UserAlreadyExistsError";
import { CloudFirestore } from "./data_access/CloudFirestore";
import { json } from "./Json";


class Auth {
  async register(userId: string, email: string, password: string): Promise<string> {
    let cf = new CloudFirestore();
    cf.insert(userId, "credentials", {id: userId, email: email, password: password});
    return userId;
  }
}

export { Auth };
