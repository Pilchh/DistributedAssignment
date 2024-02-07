require("dotenv").config();
const utils = require("./utils");

const ModerateRouter = require("./routes/moderate.routers");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

console.log("Moderate Service");

app.use(express.json());

app.use(express.static("public"));

app.use("/", ModerateRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  utils.backupTypes();
  console.log(`Listening on port: ${PORT}`);
});
