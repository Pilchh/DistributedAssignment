const submitModel = require("../models/submit.model");

const temp = (req, res) => {
  res.send(submitModel.temp());
};

module.exports = { temp };
