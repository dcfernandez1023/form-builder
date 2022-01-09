import { json } from "../../models/Json";
import { DataValidator } from "./DataValidator";


class UserDataValidator implements DataValidator {
  fieldsToTrim: json = {
    email: true,
    firstName: true,
    lastName: true
  };

  trimFields(data: json): void {
    for(var key in this.fieldsToTrim) {
      if(data[key] !== undefined && typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }
  }
}


export { UserDataValidator };
