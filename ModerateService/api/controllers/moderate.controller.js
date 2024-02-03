const etlModel = require("../models/moderate.model");

const addJoke = (req, res) => {
  console.log(req.body);
  let joke = req.body.joke;
  let punchline = req.body.punchline;
  let type = req.body.type;

  etlModel.addJoke(joke, punchline, type).then(() => res.send("Joke added!"));
};

module.exports = { addJoke };
