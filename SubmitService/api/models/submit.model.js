const amqp = require("amqplib");
require("dotenv").config();
let queue = process.env.QUEUE;
let rmq_channel;

(async () => {
  try {
    const connection = await amqp.connect(
      process.env.IS_IN_CONTAINER
        ? "amqp://guest:guest@host.docker.internal:4201"
        : "amqp://guest:guest@localhost:4201",
    );
    rmq_channel = await connection.createChannel();

    process.once("SIGINT", async () => {
      await rmq_channel.close();
      await connection.close();
    });

    await rmq_channel.assertQueue(queue, { durable: true });
    console.log(`Queue ${queue} created...`);
  } catch (err) {
    //console.log(err);
    setTimeout(() => console.log("RMQ not found. Restarting..."), 5000);
    process.exit(1);
  }
})();

const submitJoke = (joke, punchline, type) => {
  return new Promise((resolve, reject) => {
    try {
      rmq_channel.sendToQueue(
        queue,
        Buffer.from(
          JSON.stringify({ joke: joke, punchline: punchline, type: type }),
        ),
      );
      resolve("Joke Submitted");
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = { submitJoke };
