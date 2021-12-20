import { DataAccess } from "./DataAccess";
import { json } from "../Json";
import { firestore } from "./firestore";


class CloudFirestore implements DataAccess {
  connection: any;

  constructor() {
    this.initFirestoreConnection();
  }

  async getByFilter(collection: string, key: string, filterCond: string, value: any, limit: number = -1): Promise<json[]> {
    const data: json[] = [];
    const collectionRef = this.connection.collection(collection);
    var snapshot = null;
    if(limit != -1) {
      snapshot = await collectionRef.where(key, '==', value).limit(limit).get();
    }
    else {
      snapshot = await collectionRef.where(key, '==', value).get();
    }
    snapshot.forEach((doc: any) => {
      data.push(doc.data());
    });
    return data;
  }

  async getAll(collection: string): Promise<json[]> {
    const data: json[] = [];
    const collectionRef = this.connection.collection(collection);
    const snapshot = await collectionRef.get();
    snapshot.forEach((doc: any) => {
      data.push(doc.data());
    });
    return data;
  }

  async insert(id: string, collection: string, record: json): Promise<json> {
    const docRef = this.connection.collection(collection).doc(id);
    await docRef.set(record);
    return record;
  }

  async update(id: string, collection: string, record: json): Promise<json> {
    const docRef = this.connection.collection(collection).doc(id);
    await docRef.update(record);
    return record;
  }

  async delete(id: string, collection: string): Promise<string> {
    await this.connection.collection(collection).doc(id).delete();
    return id;
  }

  private initFirestoreConnection() {
    this.connection = firestore;
  }
}


export { CloudFirestore };
