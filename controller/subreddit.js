const Subreddit = require("../model/subreddit");
const Days = require("../model/days");
const days = new Days();

exports.getSubreddit = async (req, res, next) => {
    try {
        const subredditName = await req.query.subredditName;
        const authToken = await req.get("Authorization");
        console.log(authToken);
        console.log(subredditName);
        const subreddit = new Subreddit(subredditName, authToken);
        console.log("Fetching Data");
        const data = await subreddit.fetchAPI(subreddit.oauthEndpoint);

        if (data) {
            const after = data.data.after;
            const subPosts = data.data.children; // array
            subPosts.forEach((post) => {
                subreddit.timeStamps.push(post.data.created_utc);
            });

            const finished = await subreddit.fetchTimes(after);
            if (!finished) {
                console.log("Sorting");
                days.getTimes(subreddit.timeStamps);

                // TODO:

                // Move switch statement to subreddit model
                // each Day is a instance of days model
                // create alldays object to pass into switch statement
                // const allDays = {
                //     sunday: new days()
                // }

                // Use foreach to call sortimes & set day & temp
                // daysArray.forEach((day) => {
                //     days.sortTimes(day, 0, days.temp);
                // });

                // maybe create method for the days class to:
                // days.sortTimes(days.sunday, 0, days.temp);
                // //console.log(days.temp);
                // days.sundaySet = days.temp;
                // days.tempSet = [];

                days.sortTimes(days.sunday, 0, days.temp);
                //console.log(days.temp);
                days.sundaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.monday, 0, days.temp);
                days.mondaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.tuesday, 0, days.temp);
                days.tuesdaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.wednsday, 0, days.temp);
                days.wednsdaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.thursday, 0, days.temp);
                days.thursdaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.friday, 0, days.temp);
                days.fridaySet = days.temp;
                days.tempSet = [];

                days.sortTimes(days.saturday, 0, days.temp);
                days.saturdaySet = days.temp;
                days.tempSet = [];
                console.log("SUNDAY");
                console.log(days.sunday);
                console.log("MONDAY");
                console.log(days.monday);
            }
        }
    } catch (error) {
        console.log(error);
        res.status(500).json("Server Error");
    }
};
