const router = require('express').Router();
const jwt = require('jsonwebtoken');
const path = require('path');
const User = require('../models/User')
const bcrypt = require('bcrypt');

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/html/login.html'));
})

router.post('/', (req, res) => {
    
    const username = req.body.username
    const password = req.body.password

    // Error si algun dels dos camps buits
    if(username == '' || password == ''){
        return res.redirect('/login?errorMessage=nullField')
    }
    
    // Valida que username  existeixi a BBDD
    User.findOne({ where: { username } })
    .then((existingUser) => {
        
        // Error si no existeix
        if(existingUser == null) {
            return res.redirect('/login?errorMessage=usernameDoesntExists')
        }

        // Comprova que contrassenya és correcta
        bcrypt.compare(password, existingUser.password, function(error, response) {
            if(!response) {
                return res.redirect('/login?errorMessage=badPassword')
            }
            
            // Genera token de sessió
            const token = jwt.sign({username, password}, global.config.secretKey, {
                algorithm: global.config.algorithm,
                expiresIn: global.config.expiresIn
            });

            // Guarda token a cookie d'accés i reenvia a rooms
            return res.status(200).cookie('x-access-token', token).redirect('/rooms');
        });
    })
});

module.exports = router