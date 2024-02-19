require("dotenv").config();
const rmq = require("./rmq");

let moderatedQueue = process.env.MODERATED_QUEUE;
const moderatedPort = process.env.MODERATED_PORT;
const sql = require("./sql").pool;

console.log("Jokes ETL Service");

const connectRmq = () => {
  rmq
    .connect(moderatedPort, moderatedQueue)
    .then((channel) => {
      channel.consume(
        moderatedQueue,
        (message) => {
          let content = message.content.toString();
          console.log(`Message Received: ${content}`);
          let json = JSON.parse(content);
          addJoke(json.joke, json.punchline, json.type);
        },
        { noAck: true },
      );
    })
    .catch((err) => {
      console.log("RMQ not connected, trying again in 5 seconds...");
      setTimeout(connectRmq, 5000);
    });
};

const addJoke = (joke, punchline, type) => {
  try {
    assertType(type).then(() => {
      getType(type)
        .then((id) => {
          sql.query(INSERT_JOKE, [[joke, punchline, id]]);
        })
        .catch((err) => console.log(err));
    });
  } catch (err) {
    console.log(err);
  }
};

const getType = (type) => {
  return new Promise((resolve, reject) => {
    sql.query(GET_TYPE_FROM_TYPE_TEXT, [type], (err, result) => {
      if (err) reject(err);
      if (result.length > 0) resolve(result[0].type_id);
      else reject("Type not found");
    });
  });
};

const assertType = (typeName) => {
  return new Promise((resolve, reject) => {
    sql.query(
      INSERT_TYPE_IF_NOT_EXISTS,
      [typeName, typeName],
      (err, result) => {
        if (err) reject(err);
        resolve(result);
      },
    );
  });
};

setTimeout(connectRmq, 5000);

const INSERT_TYPE_IF_NOT_EXISTS =
  "INSERT INTO types (type) SELECT ? WHERE NOT EXISTS (SELECT type FROM types WHERE type = ? )";
const GET_TYPE_FROM_TYPE_TEXT = "SELECT * FROM types WHERE type = ?";
const INSERT_JOKE = "INSERT INTO jokes (joke, punchline, type) VALUES (?)";
