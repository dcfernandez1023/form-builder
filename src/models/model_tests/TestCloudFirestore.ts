import { cf } from "../data_access/CloudFirestore";
import { v4 as uuidv4 } from 'uuid';
import { json } from "../Json";


const main = async () => {
  // let cf = new CloudFirestore();
  let id: string = uuidv4().toString();

  console.log("Inserting");
  let r0: json = await cf.insert(id, "test", {id: id, test: "test"});
  console.log(r0)
  console.log("---------");

  console.log("Updating");
  let r1: json = await cf.update(id, "test", {id: id, test: "test_update"});
  console.log(r1)
  console.log("---------");

  console.log("Get with filter");
  let r2: json[] = await cf.getByFilter("test", "id", "==", id);
  console.log(r2)
  console.log("---------");

  console.log("Get all");
  let r3: json[] = await cf.getAll("test");
  console.log(r3)
  console.log("---------");

  console.log("Delete");
  let r4: string = await cf.delete(id, "test");
  console.log(r4)
  console.log("---------");

  console.log("Get all");
  let r5: json[] = await cf.getAll("test");
  console.log(r5)
  console.log("---------");
}

main();
