const express = require("express");
const JokesController = require("../controllers/jokes.controller");
const router = express.Router();

router.get("/temp", JokesController.temp);

module.exports = router;
