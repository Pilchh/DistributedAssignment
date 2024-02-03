const express = require("express");
const JokesController = require("../controllers/jokes.controller");
const router = express.Router();

router.get("/types", JokesController.getTypes);

router.get('/jokes', JokesController.getJokes);

module.exports = router;
