const {sign, verify} = require('jsonwebtoken');
const { debug_log } = require("../utils/console_debug");

const  jwtSecretKey = process.env.JWT_SECRET_KEY;
debug_log(jwtSecretKey)

const generateToken = data => {
    return sign(data, jwtSecretKey, { expiresIn: '1d' } );

}

const getTokenData = token => {
    return verify(token, jwtSecretKey);
}

module.exports = {generateToken, getTokenData};
