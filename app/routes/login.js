const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.post('/', (req, res) => {
    let userdata = {
    username: req.body.username,
    password: req.body.password
    };
    
    //Go to server for user varificarion
    if (userdata.username == "guillempado" && userdata.password == "123456") {

        const token = jwt.sign(userdata, global.config.secretKey, {
            algorithm: global.config.algorithm,
            expiresIn: '1m'
        });

        res.status(200).json({
            message: 'Login Successful',
            jwtoken: token
        });
    }

    else {
        res.status(401).json({
            message: 'Login Failed'
        });
    }

});

module.exports = router