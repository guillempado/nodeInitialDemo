const router = require('express').Router();
const verifyToken = require('../middleware/verifyToken')


router.get("/", verifyToken, (req, res) => {
    res.send({
        message: 'Protected route accessed!'
    });   
});


module.exports = router