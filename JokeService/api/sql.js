const mysql = require('mysql')

const pool = mysql.createPool({
    host: "localhost",
    user: "pilchh",
    password: "password",
    database: 'joke_service'
})

module.exports = { pool }