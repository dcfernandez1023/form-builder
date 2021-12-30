import { json } from "../Json";


interface DataAccess {
  getByFilter(collection: string, key: string, filterCond: string, value: any, limit: number): Promise<json[]>;
  getAll(collection: string): Promise<json[]>;
  insert(id: string, collection: string, record: json): Promise<json>;
  update(id: string, collection: string, record: json): Promise<json>;
  delete(id: string, collection: string): Promise<string>;
}


export { DataAccess };
