/**
 * @swagger
 * components:
 *   schemas:
 *     Submit:
 *       type: object
 *       required:
 *         - joke
 *         - punchline
 *         - type
 *       properties:
 *         joke:
 *           type: string
 *           description: The setup line for te joke
 *         punchline:
 *           type: string
 *           description: The punchline for the joke
 *         type:
 *           type: string
 *           description: The type that the joke should be classified as
 *       example:
 *         joke: This is a test joke!
 *         punchline: This is a very funny punchline!
 *         type: funny
 */

/**
 * @swagger
 * tags:
 *   name: Submit
 *   description: The submit joke API
 * /sub:
 *   post:
 *     summary: Submit a new joke
 *     tags: [Submit]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               joke:
 *                 type: string
 *                 example: funny joke setup
 *               punchline:
 *                 type: string
 *                 example: joke punchline
 *               type:
 *                 type: string
 *                 example: funny
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Joke submitted!
 *       500:
 *         description: ERROR
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Server error!
 * /types:
 *   get:
 *     summary: Get all joke types
 *     tags: [Submit]
 *     responses:
 *       '200':
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   type_id:
 *                     type: integer
 *                     example: 1
 *                   type:
 *                     type: string
 *                     example: funny
 *       '500':
 *         description: ERROR
 *         content:
 *           text/plain:
 *             schema:
 *               type: string
 *               example: Server error!
 */

const express = require("express");
const SubmitController = require("../controllers/submit.controller");
const router = express.Router();

router.post("/sub", SubmitController.submitJoke);
router.get("/types", SubmitController.getSavedTypes);

module.exports = router;
