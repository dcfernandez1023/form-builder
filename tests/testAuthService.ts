import { json } from "../src/custom_types/json";
import { AuthService } from "../src/services/AuthService";

require("dotenv").config({path: "../.env.dev"});
var assert = require('assert');

const AUTH_SERVICE_TEST = "AuthService Test";
const TEST_PWD = "test123";

describe(AUTH_SERVICE_TEST, () => {
    describe('#hashPassword', () => {
        it("Should return a hashed password", async () => {
            let hashedPassword: string = await AuthService.hashPassword(TEST_PWD);
            assert(hashedPassword.length > TEST_PWD.length);
        });
    });
});

describe(AUTH_SERVICE_TEST, () => {
    describe('#validatePassword', () => {
        it("Should successfully validate the plain text password with respect to the hashed password", async () => {
            let hashedPassword: string = await AuthService.hashPassword(TEST_PWD);
            assert(await AuthService.validatePassword(hashedPassword, TEST_PWD));
        });
    });
});

describe(AUTH_SERVICE_TEST, () => {
    describe('#validatePassword', () => {
        it("Should fail to validate the plain text password with respect to the hashed password", async () => {
            let hashedPassword: string = await AuthService.hashPassword(TEST_PWD);
            assert(await AuthService.validatePassword(hashedPassword, "different password") === false);
        });
    });
});

describe(AUTH_SERVICE_TEST, () => {
    describe('#generateAccessToken + decodeAccessToken', () => {
        it("Should fail to validate the plain text password with respect to the hashed password", async () => {
            let testUserId: string = "user001";
            let accessToken: string = AuthService.generateAccessToken(testUserId);
            assert(accessToken.length > 0);
            let decodedAccessToken: string = AuthService.decodeAccessToken(accessToken);
            assert(decodedAccessToken === testUserId);
        });
    });
});
