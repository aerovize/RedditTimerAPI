const { subredditTimes } = require("../model/subreddit.models");

exports.getSubreddit = async (req, res, next) => {
    const subredditName = req.query.subredditName;
    const authToken = req.get("Authorization");
    const a = await subredditTimes(subredditName, authToken);
    if (a) {
        return res.status(200).json(a);
    }
};
