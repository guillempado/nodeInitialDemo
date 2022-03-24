const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/html/register.html'));
})

router.post('/', (req, res) => {
    
    console.log('Register route!');

    let userdata = {
        username: req.body.username,
        password: req.body.password
    };
    
    // TODO valida que username no existeixi a BBDD

    const bcrypt = require('bcrypt');               //Importing the NPM bcrypt package.
    const saltRounds = 10;                          //We are setting salt rounds, higher is safer.
    const myPlaintextPassword = 's0/\/\P4$$w0rD';   //Unprotected password


    bcrypt.hash(data = userdata.password, saltOrRounds=10, (err, hash) => {
        //TODO guarda salted hash a la BBDD
    });

    const token = jwt.sign(userdata, global.config.secretKey, {
        algorithm: global.config.algorithm,
        expiresIn: global.config.expiresIn
    });

    // Estableix cookie d'accés i reenvia a rooms
    res.status(200).cookie('x-access-token', token).redirect('/rooms');

});

module.exports = router