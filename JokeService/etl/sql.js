require('dotenv').config();
const mysql = require('mysql')
const isInContainer = process.env.IS_IN_CONTAINER;

const pool = mysql.createPool({
    host: isInContainer ? "db" : "localhost",
    user: "pilchh",
    password: "password",
    database: 'joke_service'
})

module.exports = { pool }