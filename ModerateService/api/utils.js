require("dotenv").config();
const fs = require("node:fs");

const backupTypes = () => {
  const isInContainer = process.env.IS_IN_CONTAINER === "true";
  let url = isInContainer ? "/joke/types" : "http://localhost:3000/types";
  let saveLocation = isInContainer
    ? "/var/lib/moderate/types.json"
    : "./types.json";

  try {
    fetch(url).then((data) => {
      data.json().then((json) => {
        fs.writeFile(saveLocation, JSON.stringify(json), function (err) {
          if (err) {
            return console.log("Error", err);
          } else {
            console.log("Backup of types created");
          }
        });
      });
    });
  } catch (err) {
    console.log("Jokes Database is down, using stored types...")
  }

};

module.exports = { backupTypes };
