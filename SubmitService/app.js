const express = require("express");

const SubmitRouter = require("./routes/submit.routers");

const PORT = 3003;
const app = express();

app.use("/submit", SubmitRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
