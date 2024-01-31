const express = require("express");

const AnalyticsRouter = require("./routes/analytics.routers");

const PORT = 3000;
const app = express();

app.use("/analytics", AnalyticsRouter);

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
