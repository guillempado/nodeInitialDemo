const router = require('express').Router();

// Default routes pels errors

router.get("*", (req, res) => {
    res.status(404).send({
        error: 'Route not found'
    });   
});

router.post("*", (req, res) => {
    res.status(404).send({
        error: 'Route not found'
    });   
});

module.exports = router