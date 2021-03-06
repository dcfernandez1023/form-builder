import { User } from "../User";
import { Auth } from "../Auth";
var assert = require('assert');


// let email: string = "test@gmail.com";
// let password: string = "test123";
// let firstName: string = "Dom";
// let lastName: string = "Fernandez";
//
//
// describe("Creating and Registering a User", async () => {
//   describe("#User.createNew()", async () => {
//     it("Should create a new user and credentials in the database without error.", async () => {
//       let newUser = await User.createNew(email, password, firstName, lastName);
//       let id: string = newUser.id;
//       assert(id !== undefined && id !== null);
//     });
//   });
// });

const main = async () => {
  let email: string = "test123@gmail.com";
  let password: string = "test123";
  let firstName: string = "Dom";
  let lastName: string = "Fernandez";

  const line: string = "--------";

  console.log("Creating and registering user");
  let newUser = await User.createNew(email, password, firstName, lastName);
  let id: string = newUser.id;
  console.log(newUser);
  console.log(line);

  let user = new User();

  console.log("Updating user");
  console.log(await user.updateFields(id, {id: "123", email: "dom22c@gmail.com", firstName: "Dominic"}));
  console.log(line);

  console.log("Getting user");
  console.log(await user.toJson(id));
  console.log(line);

  console.log("Failed login");
  try {
    console.log(await Auth.login("dom22c@gmail.com", "123"));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Successful login");
  let token: string = await Auth.login("dom22c@gmail.com", "test123");
  console.log(token);
  console.log(line);

  console.log("Validate token failure");
  try {
    console.log(Auth.validateAccessToken("invalid token"));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Validate token success");
  console.log(Auth.validateAccessToken(token));
  console.log(line);

  console.log("Refresh invalid access token");
  try {
    console.log(await Auth.refreshAccessToken(id, "invalid token"));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Refresh valid access token");
  try {
    let newToken = await Auth.refreshAccessToken(id, token);
    console.log(newToken);
    console.log(Auth.validateAccessToken(newToken));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Send forgot password email with non-existing user");
  try {
    await Auth.sendForgotPasswordEmail("test13213143243545453@gmail.com");
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Send forgot password email success");
  try {
    await Auth.sendForgotPasswordEmail("dom22c@gmail.com");
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Deleting user");
  console.log(await user.delete(id, "test123"));
  console.log(line);

}

main();
