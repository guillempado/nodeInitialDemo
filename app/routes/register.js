const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const path = require('path');
const User = require('../models/User')


router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/../client/register.html'));
})

router.post('/', (req, res) => {

    const username = req.body.username
    const password = req.body.password

    // Error si algun dels dos camps buits
    if(username == '' || password == ''){
        res.redirect('/register?errorMessage=nullField')
    }

    // Valida que username no existeixi a BBDD
    User.findOne({ where: { username } })
    .then((existingUser) => {

        
        // Error si existeix
        if(existingUser != null) {
            res.redirect('/register?errorMessage=usernameAlreadyExists')
        }

        // Genera salted hash password
        bcrypt.hash(data = password, saltOrRounds=10, (err, hash) => {
            //TODO guarda salted hash a la BBDD
            if(err) throw err

            // Crea usuari 
            const user = User.build({
                name: username,
                username,
                password: hash
            })

            // Guarda l'usuari
            user.save()
            .then(() => {

                // Genera token de sessió
                const token = jwt.sign({username, password}, global.config.secretKey, {
                    algorithm: global.config.algorithm,
                    expiresIn: global.config.expiresIn
                });

                // Guarda token a cookie d'accés i reenvia a rooms
                res.status(200).cookie('x-access-token', token).redirect('/rooms');

            })

        });

    })
    
    
    

    

});

module.exports = router