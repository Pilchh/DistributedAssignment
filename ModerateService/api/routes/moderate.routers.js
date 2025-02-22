const express = require("express");
const ModerateController = require("../controllers/moderate.controller");
const router = express.Router();

router.post("/add", ModerateController.addJoke);
router.get("/mod", ModerateController.getNextJoke);
router.get("/types", ModerateController.getSavedTypes);

module.exports = router;
