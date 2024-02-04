require("dotenv").config();
const amqp = require("amqplib");

let queue = process.env.QUEUE;
const sql = require("./sql").pool;

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
      addJoke(json.joke, json.punchline, json.type);
    },
    { noAck: true },
  );
};

const addJoke = (joke, punchline, type) => {
  try {
    sql.query("SELECT * FROM types WHERE type = ?", [type], (err, result) => {
      if (result.length === 0) {
        sql.query("INSERT INTO types (type) VALUES (?)", [type]);
      }
    });
    sql.query(
      "INSERT INTO jokes (joke, punchline, type) VALUES (?)",
      [[joke, punchline, type]],
      () => {
        console.log("record added");
      },
    );
  } catch (err) {
    console.log(err);
  }
};

rmq_connect().then(() => {
  console.log(`Channel ${queue} created...`);
  rmq_consumer();
});
