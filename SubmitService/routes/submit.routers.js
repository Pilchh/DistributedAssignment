const express = require("express");
const SubmitController = require("../controllers/submit.controller");
const router = express.Router();

router.get("/temp", SubmitController.temp);

module.exports = router;
