import { Form } from "../Form";
import { User } from "../User";
import { json } from "../Json";
import * as FormElements from "../formElements";


const main = async () => {
  const line: string = "--------";
  const title: string = "Test Form";
  let user: json = {
    id: '5548237c-fb96-4838-b2e7-b964c0301147',
    email: 'dom22c@gmail.com',
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
    console.log(await form.getByFormId(formJson.id, user.id));
  }
  catch(error) {
    console.log(error);
  }
  console.log(line);

  console.log("Test inserting valid elements");
  try {
    let validElements: json[] = [
      {id: "", type: "INPUT", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
      FormElements.elements.RADIO,
      FormElements.elements.SELECT,
      FormElements.elements.TEXTAREA
    ];
    formJson.elements = validElements;
    console.log(await form.updateFields(user.id, formJson.id, formJson));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Test inserting invalid elements");
  try {
    formJson.elements = [];
    await form.updateFields(user.id, formJson.id, formJson);
    let invalidElements: json[] = [
      {id: "", type: "not valid type", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
      FormElements.elements.RADIO,
      FormElements.elements.SELECT,
      FormElements.elements.TEXTAREA
    ];
    formJson.elements = invalidElements;
    await form.updateFields(user.id, formJson.id, formJson);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Test inserting elements with duplicate ids");
  try {
    // let selectElement = FormElements.elements.SELECT;
    let invalidElements2: json[] = [
      {id: "1", type: "INPUT", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
      {id: "1", type: "INPUT", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
    ];
    formJson.elements = invalidElements2;
    await form.updateFields(user.id, formJson.id, formJson);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Test inserting select element with invalid option");
  try {
    let selectElement3 = JSON.parse(JSON.stringify(FormElements.elements.SELECT));
    selectElement3.options.push({value: 1, display: ""});
    let invalidElements3: json[] = [
      {id: "1", type: "INPUT", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
      selectElement3
    ];
    console.log(selectElement3);
    formJson.elements = invalidElements3;
    console.log(formJson);
    await form.updateFields(user.id, formJson.id, formJson);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Inserting element with invalid columns");
  try {
    let invalidElements4: json[] = [
      {id: "1", type: "INPUT", name: "Input0", label: "Test", required: true, placeholder: "Enter your name", columns: -1}
    ];
    formJson.elements = invalidElements4;
    await form.updateFields(user.id, formJson.id, formJson);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Inserting invalid submission handler");
  try {
    let submissionHandlers = [
      {
        type: "Email",
        isEnabled: true,
        receivers: ["dom22c@gmail.com"]
      },
      {
        type: "REST",
        isEnabled: true,
        endpoint: "http://localhost:5000/api/test"
      },
      {
        type: "Gsheet",
        isEnabled: true,
        gsheetId: "1e9P3xSFe3frStI4kY2hK96XNP3Feza41hPvleWUNbHw",
        test: ""
      }
    ];
    let validElements: json[] = [
      {id: "", type: "INPUT", name: "Input", label: "Test", required: true, placeholder: "Enter your name", columns: 12},
      FormElements.elements.RADIO,
      FormElements.elements.SELECT,
      FormElements.elements.TEXTAREA
    ];
    validElements[2].options.push({value: "test", display: "Test"});
    formJson.elements = validElements;
    formJson.submissionHandlers = submissionHandlers;
    await form.updateFields(user.id, formJson.id, formJson);
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Inserting valid submission handlers");
  try {
    let submissionHandlers2 = [
      {
        type: "Email",
        isEnabled: true,
        receivers: ["dom22c@gmail.com"]
      },
      {
        type: "REST",
        isEnabled: true,
        endpoint: "http://localhost:5000/api/test"
      },
      {
        type: "Gsheet",
        isEnabled: true,
        gsheetId: "1e9P3xSFe3frStI4kY2hK96XNP3Feza41hPvleWUNbHw"
      }
    ];
    formJson.submissionHandlers = submissionHandlers2;
    console.log(await form.updateFields(user.id, formJson.id, formJson));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Executing submission handlers with valid data");
  try {
    let formData: json = {};
    for(var i: number = 0; i < formJson.elements.length; i++) {
      let elementId: string = formJson.elements[i].id;
      formData[elementId] = {name: "Test", value: "test"};
    }
    console.log(await form.handleSubmit(formJson.id, formData));
  }
  catch(error: any) {
    console.log(error.message);
  }
  console.log(line);

  console.log("Delete form");
  console.log(await form.delete(user.id, formJson.id));
  console.log(line);

}

main();
