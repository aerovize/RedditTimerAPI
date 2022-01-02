const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

class Auth {
    constructor(duration) {
        this.clientId = process.env.CLIENT_ID;
        this.clientSecret = process.env.CLIENT_SECRET;
        this.redirectUri = process.env.REDIRECT_URI;
        this.duration = duration;
        this.state = uuidv4();
    }

    makeAuthUrl() {
        const params = {
            client_id: this.clientId,
            response_type: "code",
            state: this.state,
            redirect_uri: this.redirectUri,
            duration: this.duration, //"temporary"
            scope: "read",
        };
        const qs = Object.keys(params)
            .map((key) => `${key}=${params[key]}`)
            .join("&");

        return `https://ssl.reddit.com/api/v1/authorize?${qs}`;
    }

    async fetchToken(code) {
        const tokenUrl = "https://www.reddit.com/api/v1/access_token";
        const params = {
            grant_type: "authorization_code",
            code: code,
            redirect_uri: this.redirectUri,
        };
        const response = await fetch(tokenUrl, {
            method: "POST",
            body: `grant_type=${params.grant_type}&code=${params.code}&redirect_uri=${params.redirect_uri}`,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                Authorization: `Basic ${Buffer.from(
                    `${this.clientId}:${this.clientSecret}`
                ).toString("base64")}`,
            },
        });
        const data = await response.json();
        if (data) {
            return data.access_token;
        }
    }
}
module.exports = Auth;
