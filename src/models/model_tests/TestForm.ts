import { Form } from "../Form";
import { User } from "../User";
import { json } from "../Json";


const main = async () => {
  const line: string = "--------";
  const title: string = "Test Form";
  let user: json = {
    id: 'd83141ff-c06c-4945-ae6e-7e0109af5f78',
    email: 'test@gmail.com',
    firstName: 'Dom',
    lastName: 'Fernandez',
    dateCreated: 1640158612979
  };

  console.log("Create new form");
  let formJson: json = await Form.createNew(user.id, title);
  console.log(formJson);
  console.log(line);

  console.log("Create new form with non-existent user");
  try {
    await Form.createNew("invalid id", title);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  let form = new Form();

  console.log("Get form(s) by userId");
  try {
    console.log(await form.getByUserId(user.id));
  }
  catch(error) {
    console.log(error);
  }
  console.log(line);

  console.log("Get form by formId");
  try {
    console.log(await form.getByFormId(formJson.id));
  }
  catch(error) {
    console.log(error);
  }
  console.log(line);

  console.log("Delete form");
  console.log(await form.delete(formJson.id));
  console.log(line);

}

main();
