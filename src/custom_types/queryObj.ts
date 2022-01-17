import { json } from "./json";

type firestoreQueryObj = {
    identifier: string,
    collection: string,
    filterKeys: string[],
    filterConditions: string[],
    filterValues: any[],
    record: json,
    records: json[]
}

export { firestoreQueryObj };