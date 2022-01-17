import { json } from "../src/custom_types/json";
import { firestoreQueryObj } from "../src/custom_types/queryObj";
import { fda as db } from "../src/dal/FirestoreDataAccess";
import { v4 as uuidv4 } from 'uuid';

require("dotenv").config({path: "../.env.dev"});
var assert = require('assert');

const TEST_QUERY_OBJ: firestoreQueryObj = {
    identifier: "",
    collection: "test",
    filterKeys: [],
    filterConditions: [],
    filterValues: [],
    record: {},
    records: []
};
const TEST_RECORD: json = {
    id: uuidv4().toString(),
    name: "",
    age: 0,
    isCool: false
};
const FIRESTORE_TEST = "FirestoreDataAccess Test";

describe(FIRESTORE_TEST, () => {
    describe('#insert', () => {
        it("Should insert new test record without error", async () => {
            TEST_QUERY_OBJ.identifier = TEST_RECORD.id;
            TEST_QUERY_OBJ.record = Object.assign({}, TEST_RECORD);
            let query: string = JSON.stringify(TEST_QUERY_OBJ);
            await db.insert(query);
            assert.equal(true, true);
        });
    });
});

describe(FIRESTORE_TEST, () => {
    describe('#get', () => {
        it("Should get new test record without error", async () => {
            TEST_QUERY_OBJ.identifier = TEST_RECORD.id;
            TEST_QUERY_OBJ.filterKeys = ["id"];
            TEST_QUERY_OBJ.filterConditions = ["=="];
            TEST_QUERY_OBJ.filterValues = [TEST_RECORD.id];
            let query: string = JSON.stringify(TEST_QUERY_OBJ);
            let result: json[] = await db.get(query);
            assert.equal(result.length, 1);
            assert.equal(result[0].id, TEST_RECORD.id);
        });
    });
});

describe(FIRESTORE_TEST, () => {
    describe('#update', () => {
        it("Should update new test record without error", async () => {
            TEST_QUERY_OBJ.identifier = TEST_RECORD.id;
            TEST_QUERY_OBJ.record = Object.assign({}, TEST_RECORD);
            TEST_QUERY_OBJ.record.name = "Dom";
            TEST_QUERY_OBJ.record.age = 21;
            TEST_QUERY_OBJ.record.isCool = true;
            let query: string = JSON.stringify(TEST_QUERY_OBJ);
            await db.update(query);
            assert.equal(true, true);
        });
    });
});

describe(FIRESTORE_TEST, () => {
    describe('#delete', () => {
        it("Should delete the new test record without error", async () => {
            TEST_QUERY_OBJ.identifier = TEST_RECORD.id;
            let query: string = JSON.stringify(TEST_QUERY_OBJ);
            let deletedId: string = await db.delete(query);
            assert.equal(deletedId, TEST_RECORD.id);
        });
    });
});