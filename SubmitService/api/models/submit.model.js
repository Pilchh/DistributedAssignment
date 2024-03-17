const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();

// Get environment variables
const submitIp = process.env.SUBMIT_IP;
const submitQueue = process.env.SUBMIT_QUEUE;
const submitPort = process.env.SUBMIT_PORT;

let rmq_channel;

// Connect to submit RMQ
const connectSubmit = () => {
  rmq
    .connect(submitIp, submitPort, submitQueue)
    .then((channel) => {
      rmq_channel = channel;
    })
    .catch((err) => {
      console.log("Submit RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectSubmit, 5000);
    });
};

const submitJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      // Add joke to queue
      rmq.addToQueue(rmq_channel, submitQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      // Update the types from joke database
      utils.backupTypes();
      resolve("Joke Submitted");
    } catch (err) {
      reject(err);
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
connectSubmit();

module.exports = { submitJoke, getSavedTypes };
