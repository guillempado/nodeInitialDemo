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
                    res.status(401);
                    res.send({
                        error: 'Unauthorised'
                    })
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