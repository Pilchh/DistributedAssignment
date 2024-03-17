const jokesModel = require("../models/jokes.model");

const getTypes = (req, res) => {
  jokesModel
    .getTypes()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

const getJokes = (req, res) => {
  // Type of -1 if blank (any joke)
  // Count default of 1 if count is blank
  let type = req.query.type || -1;
  let count = req.query.count || 1;

  jokesModel
    .getJokes(type)
    .then((result) => {
      // Shuffle jokes
      result.sort(() => 0.5 - Math.random());
      // Return count number of jokes
      res.send(result.slice(0, count));
    })
    .catch((err) => res.send(err));
};

module.exports = { getTypes, getJokes };
