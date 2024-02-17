require("dotenv").config();
const fs = require("node:fs");

const backupTypes = () => {
  const isInContainer = process.env.IS_IN_CONTAINER === "true";
  let url = isInContainer
    ? "http://20.77.67.244/joke/types/"
    : "http://localhost:3000/types";
  let saveLocation = isInContainer
    ? "/var/lib/moderate/types.json"
    : "./types.json";

  try {
    fetch(url)
      .then((data) => {
        if (data.status === 200 || data.status === 304) {
          data.json().then((json) => {
            fs.writeFile(saveLocation, JSON.stringify(json), function (err) {
              if (err) {
                return console.log("Error", err);
              } else {
                console.log("Backup of types created");
              }
            });
          });
        }
      })
      .catch(() => "Jokes Database is down, using stored types...");
  } catch (err) {
    console.log("Jokes Database is down, using stored types...");
  }
};

const readBackupTypes = () => {
  const isInContainer = process.env.IS_IN_CONTAINER === "true";
  let saveLocation = isInContainer
    ? "/var/lib/moderate/types.json"
    : "./types.json";

  return new Promise((resolve, reject) => {
    try {
      fs.readFile(saveLocation, "utf-8", (err, data) => {
        if (err) {
          console.log(err);
          return;
        }
        console.log(data);
        resolve(data);
      });
    } catch (err) {
      reject("Unable to read local types");
    }
  });
};

module.exports = { backupTypes, readBackupTypes };
