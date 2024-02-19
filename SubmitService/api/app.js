require("dotenv").config();

const SubmitRouter = require("./routes/submit.routers");
const express = require("express");
const utils = require("./utils");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "Submit Service API Documentation",
      version: "0.0.1",
      description:
        "This page outlines all the API endpoints for the Submit Microservice",
      contact: {
        name: "Pilchh",
      },
    },
    servers: [
      {
        url: "https://20.77.67.244/submit",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const app = express();
const PORT = process.env.PORT;

console.log("Submit Service");

app.use(express.json());

app.use(express.static("public"));

app.use("/", SubmitRouter);

const specs = swaggerJsdoc(options);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));

app.get("*", (_, res) => {
  res.sendStatus(404);
});

app.listen(PORT, () => {
  utils.backupTypes();

  console.log(`Listening on port: ${PORT}`);
});
