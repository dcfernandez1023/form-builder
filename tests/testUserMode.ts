import { json } from "../src/custom_types/json";
import { User } from "../src/models/User";
var assert = require('assert');
import { v4 as uuidv4 } from 'uuid';

const USER_TEST = "User Model Test";

describe(USER_TEST, () => {
    describe('#constructor', () => {
        it("Should instantiate a new User object with a new id and dateCreated", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez");
            assert.equal(user.getId().length > 0, true);
            assert.equal(user.getDateCreated() > 0, true);
        });
    });
});

describe(USER_TEST, () => {
    describe('#constructor', () => {
        it("Should instantiate a new User object with an existing id and dateCreated", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez", uuidv4().toString(), new Date().getTime());
            assert.equal(user.getId().length > 0, true);
            assert.equal(user.getDateCreated() > 0, true);
        });
    });
});

describe(USER_TEST, () => {
    describe('#toJson', () => {
        it("Should return a JSON representation of the User object", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez");
            let userJson: json = user.toJson();
            assert.equal(Object.keys(userJson).length, 5);
        });
    });
});
