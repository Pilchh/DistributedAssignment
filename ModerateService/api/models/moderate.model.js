const rmq = require("../rmq");
require("dotenv").config();
const moderatePort = process.env.MODERATE_PORT;
const moderateQueue = process.env.MODERATE_QUEUE;

let rmq_channel;

rmq.connect(moderatePort, moderateQueue).then((channel) => {
  rmq_channel = channel;
});

const addJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      rmq.addToQueue(rmq_channel, moderateQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      resolve("Joke Added");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { addJoke };
