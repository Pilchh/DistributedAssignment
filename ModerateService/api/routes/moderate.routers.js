const express = require("express");
const ModerateController = require("../controllers/moderate.controller");
const router = express.Router();

router.post("/add", ModerateController.addJoke);

module.exports = router;
