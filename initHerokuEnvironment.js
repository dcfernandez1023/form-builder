const fs = require('fs');
const { exec } = require("child_process");

const main = () => {
  try {
    const data = fs.readFileSync("./.env", 'utf8').trim();
    let envs = data.split("\n");
    let herokuSetCmd = 'heroku config:set ';
    for(var i = 0; i < envs.length; i++) {
      exec(herokuSetCmd + envs[i], (error, stdout, stderr) => {
          if (error) {
              console.log(`error: ${error.message}`);
              return;
          }
      });
    }
  } catch (err) {
    console.error(err);
  }
}

main();
