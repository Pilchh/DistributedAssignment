const rmq = require("../rmq");
const utils = require("../utils");
require("dotenv").config();

const moderatePort = process.env.MODERATE_PORT;
const moderateQueue = process.env.MODERATE_QUEUE;
const submitPort = process.env.SUBMIT_PORT;
const submitQueue = process.env.SUBMIT_QUEUE;

let mod_channel;
let sub_channel;

rmq
  .connect(moderatePort, moderateQueue)
  .then((channel) => {
    mod_channel = channel;
  })
  .catch((err) => console.log("Moderate RMQ service is down"));

rmq
  .connect(submitPort, submitQueue)
  .then((channel) => {
    sub_channel = channel;
  })
  .catch((err) => console.log("Submit RMQ service is down"));

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

module.exports = { addJoke, getNextJoke };
