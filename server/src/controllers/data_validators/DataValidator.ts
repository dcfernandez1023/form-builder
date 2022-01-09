import { json } from "../../models/Json";


/**
  Helper function to trim string data types coming in through
  the controller
*/
interface DataValidator {
  fieldsToTrim: json  // strings to trim

  trimFields(data: json): void;
}


export { DataValidator };
