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
    describe('#constructor', () => {
        it("Should fail to instantiate a new user due to badly formatted email", () => {
            const errorFunc = () => {new User("not a good email@", "Dom", "Fernandez", uuidv4().toString(), new Date().getTime())};
            assert.throws(errorFunc, Error);
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

describe(USER_TEST, () => {
    describe('#toJson', () => {
        it("Should return a JSON representation of the User object with the specified fields excluded", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez");
            let userJson: json = user.toJson(["id", "dateCreated"]);
            assert(userJson.id === undefined);
            assert(userJson.dateCreated === undefined);
        });
    });
});

describe(USER_TEST, () => {
    describe('#fromJson', () => {
        it("Should return a User object from a JSON object", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez");
            let userJson: json = user.toJson();
            let userFromJson = User.fromJson(userJson);
            assert.equal(userFromJson !== null, true);
        });
    });
});


describe(USER_TEST, () => {
    describe('#fromJson', () => {
        it("Should fail to return a User object from a JSON object due to incorrect property type", () => {
            let user: User = new User("dom22c@gmail.com", "Dom", "Fernandez");
            let userJson: json = user.toJson();
            userJson.email = 23;
            const errorFunc = () => {User.fromJson(userJson)};
            assert.throws(errorFunc, Error);
        });
    });
});