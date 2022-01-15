import { User } from "../src/models/User";
import { cf } from "../src/models/data_access/CloudFirestore";
import { json } from "../src/models/Json";
require("../node_modules/dotenv").config({path: "../.dev_env"});
var assert = require('assert');
var expect = require('chai').expect;

const USER: string = "User";
var userData: json = {
  email: "dom44g@gmail.com",
  firstName: "Dom",
  lastName: "Fernandez",
};
const pwd = "test";

describe(USER, () => {
  describe('#createNew (positive)', () => {
    it("Should create a new user and return the new user's data", async () => {
      let newUser: json = await User.createNew(userData.email, pwd, userData.firstName, userData.lastName);
      assert.equal(newUser.id !== undefined && typeof newUser.id === "string", true);
      assert.equal(newUser.email === userData.email, true);
      assert.equal(newUser.firstName === userData.firstName, true);
      assert.equal(newUser.lastName === userData.lastName, true);
      assert.equal(newUser.dateCreated !== undefined && typeof newUser.dateCreated === "number", true);
      userData = newUser;
    });
  });
});

describe(USER, () => {
  describe('#createNew (negative)', () => {
    it("Should fail to create a new user due to the email already existing", async () => {
      try {
        let newUser: json = await User.createNew(userData.email, pwd, userData.firstName, userData.lastName);
        assert.equal(true, false) // if it reaches this line, it failed
      }
      catch(error: any) {
        assert.equal(true, true);
      }
    });
  });
});

describe(USER, () => {
  describe('#delete (negative)', () => {
    it("Should fail to delete the newly created user b/c of invalid password", async () => {
      try {
        let user = new User();
        let deletedId: string = await user.delete(userData.id, "invalid password");
        assert.equal(true, false); // if it reaches this line, it failed
      }
      catch(error: any) {
        assert.equal(true, true);
      }
    });
  });
});

describe(USER, () => {
  describe('#delete (positive)', () => {
    it("Should successfully delete the newly created user", async () => {
      let user = new User();
      let deletedId: string = await user.delete(userData.id, pwd);
      assert.equal(deletedId.length > 0 && typeof deletedId === "string", true);
    });
  });
});

describe(USER, () => {
  describe('#Cleanup', () => {
    it("Clean up any test data inserted into the database", async () => {
      if(userData.id === undefined) {
        assert.equal(true, true);
      }
      else {
        let deletedId = await cf.delete(userData.id, "users");
        assert.equal(typeof deletedId, "string");
      }
    });
  });
});
