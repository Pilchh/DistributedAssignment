const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();

const moderateIp = process.env.MODERATE_IP;
const submitIp = process.env.SUBMIT_IP;
const moderatePort = process.env.MODERATE_PORT;
const moderateQueue = process.env.MODERATE_QUEUE;
const submitPort = process.env.SUBMIT_PORT;
const submitQueue = process.env.SUBMIT_QUEUE;

let mod_channel;
let sub_channel;

rmq
  .connect(moderateIp, moderatePort, moderateQueue)
  .then((channel) => {
    mod_channel = channel;
  })
  .catch((err) => {
    console.log("Moderate RMQ service is down");
    process.exit(1);
  });

rmq
  .connect(submitIp, submitPort, submitQueue)
  .then((channel) => {
    sub_channel = channel;
  })
  .catch((err) => {
    console.log("Submit RMQ service is down");
    process.exit(1);
  });

const addJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      rmq.addToQueue(mod_channel, moderateQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      utils.backupTypes();
      resolve("Joke Added");
    } catch (err) {
      reject(err);
    }
  });
};

const getNextJoke = () => {
  return new Promise(async (resolve, reject) => {
    sub_channel
      .get(submitQueue, { noAck: true })
      .then((message) => {
        if (typeof message.content === "undefined") {
          resolve(false);
        } else {
          resolve(message.content.toString());
        }
      })
      .catch((err) => reject(err));
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

module.exports = { addJoke, getNextJoke, getSavedTypes };
