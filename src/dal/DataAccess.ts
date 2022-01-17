import { json } from "../custom_types/json";

interface DataAccess {
    get(query: string): Promise<json[]>;
    insert(query: string): Promise<void>;
    update(query: string): Promise<void>;
    delete(identifier: string): Promise<string>;
}

export { DataAccess };