const express = require("express");

const authController = require("../controller/auth.controller");

const router = express.Router();

router.get("/login", authController.login);

router.get("/reddit_callback", authController.oAuthCallback);

module.exports = router;
