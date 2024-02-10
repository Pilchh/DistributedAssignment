const submitModel = require("../models/submit.model");

const submitJoke = (req, res) => {
  let joke = req.body.joke;
  let punchline = req.body.punchline;
  let type = req.body.type;

  submitModel
    .submitJoke(joke, punchline, type)
    .then(() => res.send("Joke submitted!"));
};

const getSavedTypes = (req, res) => {
  submitModel.getSavedTypes().then((data) => {
    res.send(data);
  });
};

module.exports = { submitJoke, getSavedTypes };
