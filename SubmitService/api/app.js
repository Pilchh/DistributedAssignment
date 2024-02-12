require("dotenv").config();

const SubmitRouter = require("./routes/submit.routers");
const express = require("express");
const utils = require("./utils");

const app = express();
const PORT = process.env.PORT;

console.log("Submit Service");

app.use(express.json());

app.use(express.static("public"));

app.use("/", SubmitRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  utils.backupTypes();

  console.log(`Listening on port: ${PORT}`);
});
