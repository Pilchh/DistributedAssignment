const jokesModel = require("../models/jokes.model");

const temp = (req, res) => {
  res.send(jokesModel.temp());
};

module.exports = { temp };
