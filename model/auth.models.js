const { v4: uuidv4 } = require("uuid");
const fetch = require("node-fetch");

// The reddit api oauth flow

function makeAuthUrl() {
    const authParams = {
        client_id: process.env.CLIENT_ID,
        response_type: "code",
        state: uuidv4(),
        redirect_uri: process.env.REDIRECT_URI,
        duration: "temporary",
        scope: "read",
    };
    
        const params = new URLSearchParams();
        params.append("client_id", authParams.client_id)
        params.append("response_type", authParams.response_type)
        params.append("state", authParams.state)
        params.append("redirect_uri", authParams.redirect_uri)
        params.append("duration", authParams.duration)
        params.append("scope", authParams.scope)
        
        return `https://ssl.reddit.com/api/v1/authorize?${params}`;
}

async function fetchToken(code) {
    const tokenUrl = "https://www.reddit.com/api/v1/access_token";
    const clientSecret = process.env.CLIENT_SECRET;
    const clientId = process.env.CLIENT_ID;
    const params = {
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
    };
    const response = await fetch(tokenUrl, {
        method: "POST",
        body: `grant_type=${params.grant_type}&code=${params.code}&redirect_uri=${params.redirect_uri}`,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${Buffer.from(
                `${clientId}:${clientSecret}`
            ).toString("base64")}`,
        },
    });
    const data = await response.json();
    if (data) {
        return data.access_token;
    }
}

module.exports = {
    makeAuthUrl,
    fetchToken,
};
