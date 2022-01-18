import { DataAccess } from "../dal/DataAccess";

abstract class Dao {
    protected db: DataAccess;
    protected protectedFields: string[];

    constructor() {
        this.initDataAccess();
    }

    public getProtectedFields(): string[] {
        return this.protectedFields;
    }
    protected abstract initDataAccess(): void;
}

export { Dao };