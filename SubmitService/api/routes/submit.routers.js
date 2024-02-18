const express = require("express");
const SubmitController = require("../controllers/submit.controller");
const router = express.Router();

router.post("/sub", SubmitController.submitJoke);
router.get("/types", SubmitController.getSavedTypes);

module.exports = router;
