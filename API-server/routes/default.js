const router = require('express').Router();
const path = require('path');
const verifyToken = require('../middleware/verifyToken')

// GET a root porta a rooms com a landing page (sense auth token middleware llavors redirecciona a login)

router.get("/", verifyToken, (req, res) => {
    res.redirect('/rooms')
});

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