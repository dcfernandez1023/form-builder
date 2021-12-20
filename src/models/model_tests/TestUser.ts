import { User } from "../User";


const main = async () => {
  let email: string = "test@gmail.com";
  let password: string = "test123";
  let firstName: string = "Dom";
  let lastName: string = "Fernandez";

  const line: string = "--------";

  console.log("Creating user");
  let newUser = await User.createNew(email, password, firstName, lastName);
  let id: string = newUser.id;
  console.log(newUser);
  console.log(line);

  let user = new User(id);

  console.log("Updating user");
  console.log(await user.updateFields(id, {email: "dom22c@gmail.com", firstName: "Dominic"}));
  console.log(line);

  console.log("Getting user");
  console.log(await user.toJson());
  console.log(line);

  console.log("Deleting user");
  console.log(await user.delete(id, "test123"));
  console.log(line);

}

main();
