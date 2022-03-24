const router = require('express').Router();
const path = require('path');
const verifyToken = require('../middleware/verifyToken')

// Default routes pels errors

router.get("*", verifyToken, (req, res) => {
    res.status(404).send({
        error: 'Route not found'
    });   
});

router.post("*", verifyToken, (req, res) => {
    res.status(404).send({
        error: 'Route not found'
    });   
});

module.exports = router