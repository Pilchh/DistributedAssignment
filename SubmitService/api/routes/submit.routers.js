const express = require("express");
const SubmitController = require("../controllers/submit.controller");
const router = express.Router();

router.post("/submit", SubmitController.submitJoke);

module.exports = router;
