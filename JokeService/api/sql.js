require("dotenv").config();
const mysql = require("mysql");
const isInContainer = process.env.IS_IN_CONTAINER;

console.log(isInContainer === "true" ? "db" : "localhost");

const pool = mysql.createPool({
  host: isInContainer === "true" ? "db" : "localhost",
  user: "pilchh",
  password: "password",
  database: "joke_service",
});

module.exports = { pool };
