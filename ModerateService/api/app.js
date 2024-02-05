require("dotenv").config();

const ModerateRouter = require("./routes/moderate.routers");
const express = require("express");
const rmq = require("./rmq");

const app = express();
const PORT = process.env.PORT;
const submitQueue = process.env.SUBMIT_QUEUE;
const submitPort = process.env.SUBMIT_PORT;

console.log("Moderate Service");

rmq.connect(submitPort, submitQueue).then((channel) => {
  rmq.consumer(channel, submitQueue).then((data) => {
    // Update front end
  });
});

app.use(express.json());

app.use(express.static("public"));

app.use("/", ModerateRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
