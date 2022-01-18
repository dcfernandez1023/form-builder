import { json } from "../src/custom_types/json";
import { UserDao } from "../src/dao/UserDao";
import { User } from "../src/models/User";

require("dotenv").config({path: "../.env.dev"});
var assert = require('assert');

const USER_DAO_TEST: string = "UserDao Test";
const USER_DAO: UserDao = new UserDao();
let USER: User;

describe(USER_DAO_TEST, () => {
    describe('#create', () => {
        it("Should create a new User", async () => {
            let newUser: User = await USER_DAO.create("dom22c@gmail.com", "Dom", "Fernandez", "test123");
            USER = newUser;
            assert(newUser !== null);
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#create', () => {
        it("Should fail to create a new User due to the email already existing", async () => {
            try {
                await USER_DAO.create("dom22c@gmail.com", "Dom", "Fernandez", "test123");
            }
            catch(error: any) {
                const errorFunc = () => {throw(error)};
                assert.throws(errorFunc, Error);
            }
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#get', () => {
        it("Should get the User object", async () => {
            let user: User = await USER_DAO.get(USER.getId());
            assert(user !== null);
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#update', () => {
        it("Should successfully update user", async () => {
            let updateData: json = USER.toJson();
            updateData.id = "not an id";
            updateData.dateCreated = 0;
            updateData.email = "newEmail@gmail.com";
            updateData.firstName = "New Name";
            let updatedUser: User = await USER_DAO.update(USER.getId(), updateData);
            assert(updatedUser.getFirstName() === "New Name");
            let userJson: json = updatedUser.toJson(USER_DAO.getProtectedFields());
            assert(userJson.id === undefined);
            assert(userJson.dateCreated === undefined);
            assert(userJson.email === undefined);
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#login', () => {
        it("Should successfully login", async () => {
            let isLogin: boolean = await USER_DAO.login("dom22c@gmail.com", "test123");
            assert(isLogin);
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#login', () => {
        it("Should fail to login", async () => {
            let isLogin: boolean = await USER_DAO.login("dom22c@gmail.com", "test");
            assert(!isLogin);
        });
    });
});

describe(USER_DAO_TEST, () => {
    describe('#delete', () => {
        it("Should delete the new User object", async () => {
            let deletedId: string = await USER_DAO.delete(USER.getId());
            assert(deletedId.length > 0);
        });
    });
});