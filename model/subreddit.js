const fetch = require("node-fetch");

class Subreddit {
    constructor(name, authToken) {
        this.name = name;
        this.authToken = authToken;
        this.oauthEndpoint = `https://oauth.reddit.com/r/${name}/new`;
        this.timeStamps = [];
    }

    async fetchAPI(url) {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "User-Agent": "iWize test app (by /u/aeromaniacus)",
                Authorization: `${this.authToken}`,
            },
        });
        return await response.json();
    }

    async fetchTimes(after) {
        let isDone;
        const params = new URLSearchParams();
        params.append("after", after);
        const data = await this.fetchAPI(`${this.oauthEndpoint}?${params}`);
        const posts = data.data.children;
        const newAfter = data.data.after;
        posts.forEach((post) => {
            this.timeStamps.push(post.data.created_utc);
        });
        if (newAfter !== null) {
            console.log("Next Page");
            isDone = await this.fetchTimes(newAfter, this.authToken);
        }
        if (newAfter === null && !isDone) {
            console.log("DONE");
            console.log(isDone);
            //isDone = true;
            return;
        }
    }
}
module.exports = Subreddit;
