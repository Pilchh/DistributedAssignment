const express = require("express");
const ModerateController = require("../controllers/moderate.controller");
const router = express.Router();

router.post("/add", ModerateController.addJoke);
router.get("/next", ModerateController.getNextJoke);

module.exports = router;
