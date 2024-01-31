const express = require("express");

const ModerateRouter = require("./routes/moderate.routers");

const PORT = 3002;
const app = express();

app.use("/mod", ModerateRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
