const sql = require('../sql').pool;

const getTypes = () => {
  return new Promise((resolve, reject) => {
    sql.query("SELECT * FROM types;", (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  })
};

const getJokes = (jokeType) => {
  return new Promise((resolve, reject) => {
    sql.query(`SELECT * FROM jokes WHERE type = '${jokeType}';`, (err, result) => {
      if (err) reject(err);
      else resolve(result);
    })
  })
}

module.exports = { getTypes, getJokes };
