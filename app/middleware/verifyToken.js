const router = require('express').Router();
const jwt = require('jsonwebtoken');

router.use((req, res, next) => {
    const token = req.cookies['x-access-token'];
    
    if (token) {
        jwt.verify(
            token, 
            global.config.secretKey,
            { algorithm: global.config.algorithm }, 
            (err, decoded) => {
                if (err) {
                    res.redirect('/login')
                }
                next();
            }
        );
    }

    else {
        res.redirect('/login')
    }
});

module.exports = router;