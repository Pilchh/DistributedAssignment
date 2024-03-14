const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();
const submitIp = process.env.SUBMIT_IP;
const submitQueue = process.env.SUBMIT_QUEUE;
const submitPort = process.env.SUBMIT_PORT;

let rmq_channel;

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
      rmq.addToQueue(rmq_channel, submitQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      utils.backupTypes();
      resolve("Joke Submitted");
    } catch (err) {
      reject(err);
    }
  });
};

const getSavedTypes = () => {
  return new Promise((resolve, reject) => {
    utils
      .readBackupTypes()
      .then((data) => resolve(data))
      .catch((err) => reject(err));
  });
};
connectSubmit();
module.exports = { submitJoke, getSavedTypes };
