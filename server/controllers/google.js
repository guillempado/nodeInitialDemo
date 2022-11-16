const { getUserName } = require("../services/google_auth");
const { User } = require("../db/db");
const { generateToken } = require("../services/jwt_auth");

const googleLogin = async (req, res) => {

    try {
        // Retorna error si body no conté els fields necessaris
        if (req.body.code == null) {
            res.status(400).json({ error: "Required keys in body: code" });
            return;
        }

        const user_name = await getUserName(req.body.code);

        // IMPORTANT: Cal guardar user a mysql si no existeix perquè se li puguin mapar els missatges!
        if (await User.findOne({ where: { name: user_name } }) == null) {
            const user = await User.create({
                name: user_name,
                password: ""  // No té password, de moment els usuaris són únics i només es pot entrar per password o per OAuth, amb el que s'hagi fet primer
            });
            if (user == null) {
                res.status(500).json({ error: "Server was unable to save the new user to the database" });
                return;
            }
        }

        // Cas: login OK: Genera token a partir de user name i retorna
        res.status(200).json({
            user: user_name,
            token: generateToken({
                user: user_name,
                //password: req.body.password
            })
        })

    } catch (error) {
        res.status(500).json({ error });
    }
}

module.exports = { googleLogin };
