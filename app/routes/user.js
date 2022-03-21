const router = require('express').Router();

// Nivell 1 Exercici 1
router.get('/', (req, res) => {
    res.send({
        nom: 'Guillem Parrado',
        edat: 34,
        url: req.protocol + '://' + req.get('host') + req.originalUrl
    });
 })


 module.exports = router