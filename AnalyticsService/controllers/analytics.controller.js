const analyticsModel = require("../models/analytics.model");

const temp = (req, res) => {
  res.send(analyticsModel.temp());
};

module.exports = { temp };
