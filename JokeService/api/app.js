const express = require("express");

const JokeRouter = require("./routes/jokes.routers");

const PORT = 3000;
const app = express();

app.use(express.static("public"));

app.use("/", JokeRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
