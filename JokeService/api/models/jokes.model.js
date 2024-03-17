const sql = require("../sql").pool;

const getTypes = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM types;", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

const getJokes = (jokeType) => {
  return new Promise((resolve, reject) => {
    // If joke type is any
    if (jokeType === "-1") {
      // Select and return all jokes
      sql.query(`SELECT * FROM jokes;`, (err, result) => {
        if (err) reject(err);
        else resolve(result);
      });
    }
    // If joke type is not -1 select based off type
    sql.query(
      `SELECT * FROM jokes WHERE type = '${jokeType}';`,
      (err, result) => {
        if (err) reject(err);
        else resolve(result);
      },
    );
  });
};

module.exports = { getTypes, getJokes };
