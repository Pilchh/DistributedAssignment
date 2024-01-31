const express = require("express");
const AnalyticsController = require("../controllers/analytics.controller");
const router = express.Router();

router.get("/temp", AnalyticsController.temp);

module.exports = router;
