require("dotenv").config();
const amqp = require("amqplib");

let queue = process.env.QUEUE;

let rmq_connection;
let rmq_channel;

const rmq_connect = async () => {
  try {
    rmq_connection = await amqp.connect(
      process.env.IS_IN_CONTAINER
        ? "amqp://guest:guest@host.docker.internal:4101"
        : "amqp://guest:guest@localhost:4101",
    );
    rmq_channel = await rmq_connection.createChannel();

    process.once("SIGINT", async () => {
      await rmq_channel.close();
      await rmq_connection.close();
    });

    await rmq_channel.assertQueue(queue, { durable: true });
  } catch (err) {
    console.log("Error:", err);
  }
};

const rmq_consumer = () => {
  rmq_channel.consume(
    queue,
    (message) => {
      let content = message.content.toString();
      let json = JSON.parse(content);
      console.log(`Message Received: ${content}`);
    },
    { noAck: true },
  );
};

rmq_connect().then(() => {
  console.log(`Channel ${queue} created...`);
  rmq_consumer();
});
