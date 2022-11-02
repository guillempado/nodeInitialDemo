const {sign, verify} = require('jsonwebtoken');

const  jwtSecretKey = process.env.JWT_SECRET_KEY;
console.log(jwtSecretKey)

const generateToken = data => {
    return sign(data, jwtSecretKey, { expiresIn: '1d' } );

}

const getTokenData = token => {
    return verify(token, jwtSecretKey);
}

module.exports = {generateToken, getTokenData};
