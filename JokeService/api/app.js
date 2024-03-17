require("dotenv").config();
const express = require("express");
const cors = require("cors");

const JokeRouter = require("./routes/jokes.routers");

const PORT = process.env.PORT;
const app = express();

// Set up middleware
app.use(cors());
app.use(express.static("public"));

// Add routes
app.use("/", JokeRouter);

// Blanket 404 rule for undefined routes
app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
