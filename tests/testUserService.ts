import { json } from "../src/custom_types/json";
import { UserService } from "../src/services/UserService";

require("dotenv").config({path: "../.env.dev"});
var assert = require('assert');

const USER_SERVICE_TEST = "UserService Test";

describe(USER_SERVICE_TEST, () => {
    describe('#sendRegistrationEmail', () => {
        it("Should send registration email without error", async () => {
            await UserService.sendRegistrationEmail("dom22c@gmail.com");
        });
    });
});

describe(USER_SERVICE_TEST, () => {
    describe('#sendRegistrationEmail', () => {
        it("Should fail to send registration email due to account already existing", async () => {
            try {
                await UserService.sendRegistrationEmail("dcfernandez@dons.usfca.edu");
            }
            catch(error: any) {
                const errFunc = () => {throw(error)}
                assert.throws(errFunc, Error);
            }
        });
    });
});

describe(USER_SERVICE_TEST, () => {
    describe('#sendForgotPasswordEmail', () => {
        it("Should send forgot password email without error", async () => {
            await UserService.sendForgotPasswordEmail("dcfernandez@dons.usfca.edu");
        });
    });
});

describe(USER_SERVICE_TEST, () => {
    describe('#sendForgotPasswordEmail', () => {
        it("Should fail to send forgot password due to user not existing", async () => {
            try {
                await UserService.sendForgotPasswordEmail("notAUser@gmail.com");
            }
            catch(error: any) {
                const errFunc = () => {throw(error)}
                assert.throws(errFunc, Error);
            }
        });
    });
});