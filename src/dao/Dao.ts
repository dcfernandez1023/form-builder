import { DataAccess } from "../dal/DataAccess";

abstract class Dao {
    protected db: DataAccess;

    constructor() {
        this.initDataAccess();
    }

    protected abstract initDataAccess(): void;
}

export { Dao };