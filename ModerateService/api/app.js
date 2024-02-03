require("dotenv").config();

const ModerateRouter = require("./routes/moderate.routers");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use("/", ModerateRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
