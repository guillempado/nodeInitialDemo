const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    const token = req.headers['x-access-token'];
    
    // console.log(token);
    
    if (token) {
        jwt.verify(
            token, 
            global.config.secretKey,
            { algorithm: global.config.algorithm }, 
            (err, decoded) => {
                if (err) {
                    /*
                    const errordata = {
                        message: err.message,
                        expiredAt: err.expiredAt
                    };
                    console.log(errordata);
                    */
                    return res.status(401).json({
                        message: 'Unauthorized Access'
                    });
                }
                /*
                req.decoded = decoded;
                console.log(decoded);
                */
                next();
            }
        );
    }

    else {
        return res.status(403).json({
            message: 'Forbidden Access'
        });
    }
});

module.exports = router;