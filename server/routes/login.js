const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const bcrypt = require("bcrypt");

const { User } = require('../db/db')

router.post('/', jsonParser, async (req, res) => {
    try {

        // Retorna error si body no conté els fields necessaris
        if(req.body.username == null || req.body.password == null){
            res.status(400).json({ error: "Required keys in body: username, password" });
            return;
        }

        // Troba user
        const user = await User.findOne({ where: { name: req.body.username } }) // VA EN EL BODY DEL REQUEST PQ VÉ D'UN FORMULARI POST


        // Cas: no existeix
        if (user == null) {
            res.status(404).json({ error: "The user does not exist" });
            return;
        }

        // Cas: password invalid
        const passwordsMatch = await bcrypt.compare(req.body.password, user.password);
        if(!passwordsMatch){
            res.status(401).json({ error: "Username exist but the passwords do not match" });
            return;
        }

        // Cas: login OK
        // TODO: a retornar cookie de sessió, de manera que es quedi loguejat
        res.status(200).json({ message: "OK" });


    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router