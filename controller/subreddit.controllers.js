const { subredditTimes } = require("../model/subreddit.models");

exports.getSubreddit = async (req, res, next) => {
    const subredditName = req.query.subredditName;
    const authToken = req.get("Authorization");
    if (!subredditName || !authToken || typeof subredditName !== 'string') {
        res.status(400).json({
            error: "Subreddit name and authentication token required"
        })
    }
    try {
        const sortedTimes = await subredditTimes(subredditName, authToken);
        if (sortedTimes) res.status(200).json(sortedTimes);
    } catch(err) {
        res.status(500).json("Server Error")
    }
    
    
};
