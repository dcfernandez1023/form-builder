const fs = require('fs');


const initGoogleCreds = (environment: string) => {
  try {
    fs.writeFileSync(
      environment === "dev" ? "./firebase_key/google-credentials.json" : "../firebase_key/google-credentials.json",
      process.env.GOOGLE_APPLICATION_CREDENTIALS_JSON
    );
  }
  catch(error: any) {
    console.log("Failed to write google-credentials: " + error.message);
    process.exit(1);
  }
}

const main = () => {
  console.log("## INITIALIZING EXPRESS SERVER ##");
  if(process.argv.length != 4) {
    console.log("Usage: ");
    console.log("\t* Typescript: ts-node index.ts <relative-path-to-.env> <environment>");
    console.log("\t* Node.js: node index.js <relative-path-to-.env> <environment>");
    process.exit(0);
  }
  let envPath = __dirname + process.argv[2];
  require('dotenv').config({path: envPath});
  initGoogleCreds(process.argv[3]);
  const server = require("./src/server");
  const port = process.env.PORT || 5000;
  server.startServer(port);
}

main();
