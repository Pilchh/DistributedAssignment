const express = require("express");
const SubmitController = require("../controllers/submit.controller");
const router = express.Router();

router.get("/submit", SubmitController.submitJoke);

module.exports = router;
