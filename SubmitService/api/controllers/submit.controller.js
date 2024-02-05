const submitModel = require("../models/submit.model");

const submitJoke = (req, res) => {
  let joke = req.body.joke;
  let punchline = req.body.punchline;
  let type = req.body.type;

  submitModel
    .submitJoke(joke, punchline, type)
    .then(() => res.send("Joke submitted!"));
};

module.exports = { submitJoke };
