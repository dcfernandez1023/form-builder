const fs = require('fs');
const { exec } = require("child_process");

const main = () => {
  try {
    const data = fs.readFileSync("./.env", 'utf8').trim();
    let envs = data.split("\n");
    let herokuSetCmd = 'heroku config:set ';
    for(var i = 0; i < envs.length; i++) {
      let env = envs[i];
      let equalsIndex = env.indexOf("=");
      if(equalsIndex == -1 || equalsIndex+1 == env.length) {
        throw new Error("Invalid env variable");
      }
      let doubleQuotedEnv = env.slice(0, equalsIndex+1) + '"' + env.slice(equalsIndex+1) + '"';
      exec(herokuSetCmd + oubleQuotedEnv, (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
      });
    }
  }
  catch (err) {
    console.error(err);
  }
}

main();
