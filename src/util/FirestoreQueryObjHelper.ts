import { json } from "../custom_types/json";
import { firestoreQueryObj } from "../custom_types/queryObj";

class FirestoreQueryObjHelper {
    public static getQueryObj(
        identifier?: string, 
        collection?: string, 
        filterKeys?: string[], 
        filterConditions?: string[], 
        filterValues?: string[], 
        record?: json, 
        records?: json[]
    ): firestoreQueryObj {
        return {
            identifier: identifier === undefined ? "" : identifier,
            collection: collection === undefined ? "" : collection,
            filterKeys: filterKeys === undefined ? [] : filterKeys,
            filterConditions: filterConditions === undefined ? [] : filterConditions,
            filterValues: filterValues === undefined ? [] : filterValues,
            record: record === undefined ? {} : record,
            records: records === undefined ? [] : records
        };
    }
}

export { FirestoreQueryObjHelper };

