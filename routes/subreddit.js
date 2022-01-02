const express = require("express");

const subredditController = require("../controller/subreddit");

const router = express.Router();

router.get("/subreddit", subredditController.getSubreddit);

module.exports = router;
