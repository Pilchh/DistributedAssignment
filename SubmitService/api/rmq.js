require("dotenv").config();
const amqp = require("amqplib");

const connect = async (ip, port, queue) => {
  return new Promise(async (resolve, reject) => {
    try {
      let rmq_connection = await amqp.connect(
        `amqp://guest:guest@${ip}:${port}`,
      );
      let rmq_channel = await rmq_connection.createChannel();

      process.once("SIGINT", async () => {
        await rmq_channel.close();
        await rmq_connection.close();
      });

      await rmq_channel.assertQueue(queue, { durable: true });
      console.log(`RMQ Connected on port: ${port}`);
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
