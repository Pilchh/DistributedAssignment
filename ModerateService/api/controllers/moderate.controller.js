const moderateModel = require("../models/moderate.model");

const addJoke = (req, res) => {
  let joke = req.body.joke;
  let punchline = req.body.punchline;
  let type = req.body.type;

  moderateModel
    .addJoke(joke, punchline, type)
    .then(() => res.send("Joke added!"));
};

module.exports = { addJoke };
