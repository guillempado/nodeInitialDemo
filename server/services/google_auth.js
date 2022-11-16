const { google } = require("googleapis");

const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT, // this must match your google api settings
);

const getUserName = async code => {
    const { tokens } = await Oauth2Client.getToken(code);
    Oauth2Client.setCredentials(tokens);
    const usr_info = await oauth2.userinfo.get({ auth: Oauth2Client });
    return usr_info.data.name;
}

module.exports = { getUserName };
