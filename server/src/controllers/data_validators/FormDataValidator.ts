import { json } from "../../models/Json";
import { DataValidator } from "./DataValidator";


class FormDataValidator implements DataValidator {
  fieldsToTrim: json = {
    title: true,
    submitMessage: true
  };

  trimFields(data: json): void {
    for(var key in this.fieldsToTrim) {
      if(data[key] !== undefined && typeof data[key] === "string") {
        data[key] = data[key].trim();
      }
    }
  }
}


export { FormDataValidator };
