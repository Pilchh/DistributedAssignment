const moderateModel = require("../models/moderate.model");

const temp = (req, res) => {
  res.send(moderateModel.temp());
};

module.exports = { temp };
