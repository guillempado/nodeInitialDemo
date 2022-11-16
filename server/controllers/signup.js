const { User } = require("../db/db");
const bcrypt = require("bcrypt");
const { generateToken } = require("../services/jwt_auth");

const passwordSignup = async (req, res) => {
    try {

        // Retorna error si body no conté els fields necessaris
        if (req.body.username == null || req.body.password == null) {
            res.status(400).json({ error: "Required keys in body: username, password" });
            return;
        }

        // Retorna error si ja existeix
        const foundUser = await User.findOne({ where: { name: req.body.username } }) // VA EN EL BODY DEL REQUEST PQ VÉ D'UN FORMULARI POST

        if (foundUser != null) {
            res.status(403).json({ error: "Username already exists" });
            return;
        }

        // Encripta password
        let hashPassword = await bcrypt.hash(req.body.password, 10);
        if (hashPassword == null) {
            res.status(500).json({ error: "Server was unable to hash password" });
            return;
        }

        // Desa nou usuari
        const user = await User.create({
            name: req.body.username,
            password: hashPassword
        });
        if (user == null) {
            res.status(500).json({ error: "Server was unable to save the new user to the database" });
            return;
        }

        // Retorna
        // Cas: login OK: retorna token de sessió
        res.status(200).json({
            token: generateToken({
                user: req.body.username,
                password: req.body.password
            })
        })

    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { passwordSignup };
