const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();

// Get environment variables
const moderateIp = process.env.MODERATED_IP;
const submitIp = process.env.SUBMIT_IP;
const moderatePort = process.env.MODERATED_PORT;
const moderateQueue = process.env.MODERATE_QUEUE;
const submitPort = process.env.SUBMIT_PORT;
const submitQueue = process.env.SUBMIT_QUEUE;

let mod_channel;
let sub_channel;

// Connect to moderate RMQ
const connectModerate = () => {
  rmq
    .connect(moderateIp, moderatePort, moderateQueue)
    .then((channel) => {
      mod_channel = channel;
    })
    .catch((err) => {
      // Restart after 5 seconds on error
      console.log("Moderate RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectModerate, 5000);
    });
};

// Connect to submit RMQ
const connectSubmit = () => {
  rmq
    .connect(submitIp, submitPort, submitQueue)
    .then((channel) => {
      sub_channel = channel;
    })
    .catch((err) => {
      // Restart after 5 seconds on error
      console.log("Submit RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectSubmit, 5000);
    });
};

const addJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      // Add joke to moderate RMQ
      rmq.addToQueue(mod_channel, moderateQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      // Update the types from joke database
      utils.backupTypes();
      resolve("Joke Added");
    } catch (err) {
      reject(err);
    }
  });
};

const getNextJoke = () => {
  return new Promise(async (resolve, reject) => {
    if (sub_channel) {
      // Get first joke in queue
      sub_channel
        .get(submitQueue, { noAck: true })
        .then((message) => {
          if (
            typeof message.content === "undefined" ||
            message.status === 502
          ) {
            // Return false if there is no joke
            resolve(false);
          } else {
            // Send data if joke found
            resolve(message.content.toString());
          }
        })
        .catch((err) => reject(err));
    } else {
      resolve(false);
    }
  });
};

// Return the saved types found in the types.json file
const getSavedTypes = () => {
  return new Promise((resolve, reject) => {
    utils
      .readBackupTypes()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

// Initial RMQ function calls
connectModerate();
connectSubmit();

module.exports = { addJoke, getNextJoke, getSavedTypes };
