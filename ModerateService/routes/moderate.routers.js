const express = require("express");
const ModerateController = require("../controllers/moderate.controller");
const router = express.Router();

router.get("/temp", ModerateController.temp);

module.exports = router;
