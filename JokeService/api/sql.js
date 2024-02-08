require("dotenv").config();
const mysql = require("mysql");
const isInContainer = process.env.IS_IN_CONTAINER;

const pool = mysql.createPool({
  host: isInContainer === "true" ? "db" : "localhost",
  user: "root",
  password: "pass",
  database: "jokes_service",
});

module.exports = { pool };
