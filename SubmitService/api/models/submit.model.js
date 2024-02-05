const rmq = require("../rmq");
require("dotenv").config();
const submitQueue = process.env.SUBMITTED_QUEUE;
const submitPort = process.env.SUBMITTED_PORT;

let rmq_channel;

rmq.connect(submitPort, submitQueue).then((channel) => {
  rmq_channel = channel;
});

const submitJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      rmq.addToQueue(rmq_channel, submitQueue, {
        joke: joke,
        punchline: punchline,
        type: type,
      });
      resolve("Joke Submitted");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { submitJoke };
