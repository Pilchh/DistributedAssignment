const moderateModel = require("../models/moderate.model");

const addJoke = (req, res) => {
  let joke = req.body.joke;
  let punchline = req.body.punchline;
  let type = req.body.type;

  moderateModel
    .addJoke(joke, punchline, type)
    .then(() => res.send("Joke added!"));
};

const getNextJoke = (req, res) => {
  moderateModel.getNextJoke().then((data) => {
    console.log(data);
    res.send(data);
  });
};

module.exports = { addJoke, getNextJoke };
