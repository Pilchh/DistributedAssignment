const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();

const moderateIp = process.env.MODERATED_IP;
const submitIp = process.env.SUBMIT_IP;
const moderatePort = process.env.MODERATED_PORT;
const moderateQueue = process.env.MODERATE_QUEUE;
const submitPort = process.env.SUBMIT_PORT;
const submitQueue = process.env.SUBMIT_QUEUE;

let mod_channel;
let sub_channel;

const connectModerate = () => {
  rmq
    .connect(moderateIp, moderatePort, moderateQueue)
    .then((channel) => {
      mod_channel = channel;
    })
    .catch((err) => {
      console.log("Moderate RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectModerate, 5000);
    });
};

const connectSubmit = () => {
  rmq
    .connect(submitIp, submitPort, submitQueue)
    .then((channel) => {
      sub_channel = channel;
    })
    .catch((err) => {
      console.log("Submit RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectSubmit, 5000);
    });
};

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
    if (sub_channel) {
      sub_channel
        .get(submitQueue, { noAck: true })
        .then((message) => {
          if (
            typeof message.content === "undefined" ||
            message.status === 502
          ) {
            resolve(false);
          } else {
            resolve(message.content.toString());
          }
        })
        .catch((err) => reject(err));
    } else {
      resolve(false);
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

connectModerate();
connectSubmit();

module.exports = { addJoke, getNextJoke, getSavedTypes };
