import { json } from "../Json";


interface DataAccess {
  async getByFilter(collection: string, key: string, filterCond: string, value: any, limit: number): Promise<json[]>;
  async getAll(collection: string): Promise<json[]>;
  async insert(id: string, collection: string, record: json): Promise<json>;
  async update(id: string, collection: string, record: json): Promise<json>;
  async delete(id: string, collection: string): Promise<string>;
}


export { DataAccess };
