const fetch = require("node-fetch");

const Days = require("./days");

const timeStamps = [];

const allDays = {
    sunday: new Days(),
    monday: new Days(),
    tuesday: new Days(),
    wednsday: new Days(),
    thursday: new Days(),
    friday: new Days(),
    saturday: new Days(),
};

// Makes all requests to Reddit API
async function fetchAPI(url, authToken) {

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "User-Agent": "iWize test app (by /u/aeromaniacus)",
            Authorization: `${authToken}`,
        },
    });
    return await response.json();
}

// Starts initial fetching of subreddit data
async function initialFetchTimes(subreddit, authToken) {
    const params = new URLSearchParams();
    params.append("limit", "100");
    const initialUrl = `https://oauth.reddit.com/r/${subreddit}/new?${params}`;
    const initialData = await fetchAPI(initialUrl, authToken);

    const posts = initialData.data.children;
    const newAfter = initialData.data.after;
    posts.forEach((post) => {
        // Push all gathered post timestamps to array
        timeStamps.push(post.data.created_utc);
    });
    // Required to use the APIs pagination, so the rest of data can be fetched.
    return newAfter;
}

// Finishes fetching time data until there are no more posts left.
async function fetchTimes(after, subreddit, authToken) {
    let isDone;
    const params = new URLSearchParams();
    params.append("limit", "100");
    params.append("after", after);
    const afterUrl = `https://oauth.reddit.com/r/${subreddit}/new?${params}`;
    const initialData = await fetchAPI(afterUrl, authToken);
    const posts = initialData.data.children;
    const newAfter = initialData.data.after;
    posts.forEach((post) => {
        timeStamps.push(post.data.created_utc);
    });
    // When there is no data left, the reddit api will respond with a null value in the pagination field.
    // fetchTimes will continue calling itself until the after field is null.
    if (newAfter !== null) {
        console.log("Next Page");
        isDone = await fetchTimes(newAfter, subreddit, authToken);
    }
    // When after returns null we can stop fetching more data
    if (newAfter === null && !isDone) {
        console.log("DONE");
        return;
    }
}

// Sorts the gathered times into a object for each day of the week.
function sortTimes(timeStamps) {
    timeStamps.forEach((time) => {
        // Timestamps are in unix time, so must be converted.
        const date = new Date(time * 1000);
        const hour = date.getHours();
        const day = date.getDay();
        // Sort the times to their corresponding day they belong to.
        switch (day) {
            case 0:
                allDays.sunday.hours.push(hour);
                return;
            case 1:
                allDays.monday.hours.push(hour);
                return;
            case 2:
                allDays.tuesday.hours.push(hour);
                return;
            case 3:
                allDays.wednsday.hours.push(hour);
                return;
            case 4:
                allDays.thursday.hours.push(hour);
                return;
            case 5:
                allDays.friday.hours.push(hour);
                return;
            case 6:
                allDays.saturday.hours.push(hour);
                return;
        }
    });
}

async function subredditTimes(subreddit, authToken) {
    const after = await initialFetchTimes(subreddit, authToken);

    const sorted = await fetchTimes(after, subreddit, authToken);
    if (!sorted) {
        sortTimes(timeStamps);
        // Places 
        allDays.sunday.setDays();
        allDays.monday.setDays();
        allDays.tuesday.setDays();
        allDays.wednsday.setDays();
        allDays.thursday.setDays();
        allDays.friday.setDays();
        allDays.saturday.setDays();

        //TODO: Sort arrays to time by length

        return {
            // Military Time: 0 is 12AM, 24 is 12PM
             // [[0,0,0,], [1,1,1,1,1], [2,2,2,2,2], [3,3,3]]
            sunday: allDays.sunday.hoursGet,
            monday: allDays.monday.hoursGet,
            tuesday: allDays.tuesday.hoursGet,
            wednsday: allDays.wednsday.hoursGet,
            thursday: allDays.thursday.hoursGet,
            friday: allDays.friday.hoursGet,
            saturday: allDays.saturday.hoursGet,
        };
    }
}

module.exports = {
    subredditTimes,
};
