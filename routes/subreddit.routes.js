const express = require("express");

const subredditController = require("../controller/subreddit.controllers");

const router = express.Router();

router.get("/subreddit", subredditController.getSubreddit);

module.exports = router;
