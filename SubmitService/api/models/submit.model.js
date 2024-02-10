const rmq = require("../rmq");
const { readBackupTypes, backupTypes } = require("../utils");
require("dotenv").config();
const submitQueue = process.env.SUBMITTED_QUEUE;
const submitPort = process.env.SUBMITTED_PORT;

let rmq_channel;

rmq
  .connect(submitPort, submitQueue)
  .then((channel) => {
    rmq_channel = channel;
  })
  .catch((err) => {
    console.log("Failed to connect to RMQ. Restarting...");
    process.exit(1);
  });

const submitJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      rmq.addToQueue(rmq_channel, submitQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      backupTypes();
      resolve("Joke Submitted");
    } catch (err) {
      reject(err);
    }
  });
};

const getSavedTypes = () => {
  return new Promise((resolve, reject) => {
    readBackupTypes()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};

module.exports = { submitJoke, getSavedTypes };
