const jokesModel = require("../models/jokes.model");

const getTypes = (req, res) => {
  jokesModel
    .getTypes()
    .then((result) => res.send(result))
    .catch((err) => console.log(err));
};

const getJokes = (req, res) => {
  let type = req.query.type || -1;
  let count = req.query.count || 1;
  jokesModel
    .getJokes(type)
    .then((result) => {
      result.sort(() => 0.5 - Math.random());
      res.send(result.slice(0, count));
    })
    .catch((err) => res.send(err));
};

module.exports = { getTypes, getJokes };
