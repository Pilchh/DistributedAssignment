require("dotenv").config();

const SubmitRouter = require("./routes/submit.routers");
const express = require("express");

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
  console.log(`Listening on port: ${PORT}`);
});
