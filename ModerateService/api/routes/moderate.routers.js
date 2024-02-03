const express = require("express");
const JokesController = require("../controllers/moderate.controller");
const router = express.Router();

router.post("/add", JokesController.addJoke);

module.exports = router;
