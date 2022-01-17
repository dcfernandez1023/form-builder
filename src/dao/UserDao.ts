import { Dao } from "./Dao";
import { fda as db } from "../dal/FirestoreDataAccess";

class UserDao extends Dao {
    constructor() {
        super();
    }

    protected initDataAccess(): void {
        super.db = db;
    }

}

export { Dao };