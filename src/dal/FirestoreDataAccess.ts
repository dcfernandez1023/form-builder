import { json } from "../custom_types/json";
import { firestoreQueryObj } from "../custom_types/queryObj";
import { DataAccess } from "./DataAccess";
var admin = require("firebase-admin");

class FirestoreDataAccess implements DataAccess {
    private connection: any;

    constructor() {
        admin.initializeApp({
            credential: admin.credential.applicationDefault(),
            databaseURL: 'https://formbuilder-52e7b.firebaseio.com'
        });
        this.connection = new admin.firestore.Firestore();
    }

    public async get(query: string): Promise<json[]> {
        let queryObj: firestoreQueryObj = JSON.parse(query);
        const data: json[] = [];
        const collectionRef: any = this.connection.collection(queryObj.collection);
        var ref: any = collectionRef;
        var snapshot: any = null;
        if(queryObj.filterKeys.length != queryObj.filterConditions.length || queryObj.filterKeys.length != queryObj.filterValues.length || queryObj.filterConditions.length != queryObj.filterValues.length) {
          throw new Error("The parameters queryObj.filterKeys, queryObj.filterConditions, and/or queryObj.filterValues are not of equal array lengths");
        }
        for(var i : number = 0; i < queryObj.filterKeys.length; i++) {
            ref = ref.where(queryObj.filterKeys[i], queryObj.filterConditions[i], queryObj.filterValues[i]);
        }
        snapshot = await ref.get();
        snapshot.forEach((doc: any) => {
          data.push(doc.data());
        });
        return data;
    }

    /**
     * 
     * @param query The query string representing the firestoreQueryObj 
     * @description Requires collection, identifier, and record
     */
    public async insert(query: string): Promise<void> {
        let queryObj: firestoreQueryObj = JSON.parse(query);
        const docRef = this.connection.collection(queryObj.collection).doc(queryObj.identifier);
        await docRef.set(queryObj.record);
    }

    public async update(query: string): Promise<void> {
        let queryObj: firestoreQueryObj = JSON.parse(query);
        const docRef = this.connection.collection(queryObj.collection).doc(queryObj.identifier);
        await docRef.update(queryObj.record);
    }
    
    public async delete(query: string): Promise<string> {
        let queryObj: firestoreQueryObj = JSON.parse(query);
        await this.connection.collection(queryObj.collection).doc(queryObj.identifier).delete();
        return queryObj.identifier;
    }
}

const fda: DataAccess = new FirestoreDataAccess();

export { fda };