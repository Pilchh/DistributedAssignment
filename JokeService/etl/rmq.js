require("dotenv").config();
const amqp = require("amqplib");

const connect = async (port, queue) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rmq_connection = await amqp.connect(
        process.env.IS_IN_CONTAINER
          ? `amqp://guest:guest@${process.env.MODERATED_IP}:${port}`
          : `amqp://guest:guest@localhost:${port}`,
      );
      let rmq_channel = await rmq_connection.createChannel();

      await rmq_channel.assertQueue(queue, { durable: true });
      console.log(`RMQ Connected on port: ${port}`);

      rmq_connection.on("error", () => {
        console.log("RMQ disconnected, trying again in 5 seconds...");
        setTimeout(() => connect(port, queue), 5000);
      });

      rmq_connection.on("close", () => {
        console.log("RMQ disconnected, trying again in 5 seconds...");
        setTimeout(() => connect(port, queue), 5000);
      });

      resolve(rmq_channel);
    } catch (err) {
      reject(err);
    }
  });
};

const consumer = (channel, queue) => {
  return new Promise((resolve, reject) => {
    try {
      channel.consume(
        queue,
        (message) => {
          let content = message.content.toString();
          console.log(`Message Received: ${content}`);
          let json = JSON.parse(content);
          resolve(json);
        },
        { noAck: true },
      );
    } catch (err) {
      reject(err);
    }
  });
};

const addToQueue = (channel, queue, data) => {
  channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)));
};

module.exports = { connect, consumer, addToQueue };
