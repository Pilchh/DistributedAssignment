require("dotenv").config();
const utils = require("./utils");

const ModerateRouter = require("./routes/moderate.routers");
const express = require("express");

const app = express();
const PORT = process.env.PORT;

console.log("Moderate Service");

// Set up middleware
app.use(express.json());
app.use(express.static("public"));

// Add routes
app.use("/", ModerateRouter);

// Blanket 404 rule for undefined routes
app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  // Backup joke types on boot
  utils.backupTypes();

  console.log(`Listening on port: ${PORT}`);
});
