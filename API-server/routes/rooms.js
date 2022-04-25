const router = require('express').Router();
const path = require('path');
const verifyToken = require('../middleware/verifyToken')

router.get('/', verifyToken, (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/rooms.html'));
})

module.exports = router