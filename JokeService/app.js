const express = require("express");

const JokeRouter = require("./routes/jokes.routers");

const PORT = 3001;
const app = express();

app.use("/jokes", JokeRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
