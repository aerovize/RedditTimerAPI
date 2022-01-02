const Auth = require("../model/auth");
const auth = new Auth("temporary");

exports.login = (req, res, next) => {
    const authURL = auth.makeAuthUrl();
    res.status(200).json(authURL);
};

exports.oAuthCallback = async (req, res, next) => {
    //const state = req.query.state;
    const code = req.query.code;
    try {
        const accessToken = await auth.fetchToken(code);
        if (accessToken) {
            res.status(200).json({ AccessToken: accessToken });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Unexpected Error !");
    }
};
