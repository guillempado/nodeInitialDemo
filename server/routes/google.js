const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
const {
    generateToken
} = require("../services/jwt_auth")

const { google } = require('googleapis');
const { User } = require("../db/db");
const oauth2 = google.oauth2('v2');

const Oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT, // this must match your google api settings
);

/**
 * Ruta de redirect de google auth (un cop l'usuari ha estat autenticat per Google
 */
router.post('/', jsonParser, async (req, res) => {
    try {

        // Retorna error si body no conté els fields necessaris
        if (req.body.code == null) {
            res.status(400).json({ error: "Required keys in body: code" });
            return;
        }

        /*
        const code = req.query.code;
        console.log(code)
        let thisUrl = req.protocol + '://' + req.get('host') + req.originalUrl  // La mateixa URL en què et trobes, x ex 'http://localhost:3000/api_v1.0/auth/login/google'
        thisUrl = thisUrl.slice(0, thisUrl.lastIndexOf('?'))  // Elimina query params
        const url = "https://oauth2.googleapis.com/token";
        const queryparams = {
            code,
            client_id: process.env.GOOGLE_CLIENT_ID,
            client_secret: process.env.GOOGLE_CLIENT_SECRET,
            redirect_uri: thisUrl,
            grant_type: "authorization_code",
        };
        console.log(queryparams)
        // Aconsegueix id i acces token de l'usuari a partir del codi d'accés retornat per OAuth
        const {
            id_token,
            access_token
        } = (await axios.post(url, querystring.stringify(queryparams), {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        })).data
        console.log(id_token)
        console.log(access_token)
        // Aconsegueix la info de perfil de l'usuari a partir dels tokens d'id i d'accés
        const googleUser = (await axios
            .get(
                `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`,
                {
                    headers: {
                        Authorization: `Bearer ${id_token}`,
                    },
                }
            )).data
        console.log(googleUser)
        // Si tot correcte, retorna token de login de sessió amb el nom d'usuari al token
        res.status(200).json({
            token: generateToken({
                user: googleUser.name,
                //password: req.body.password
            })
        })

         */

        const code = req.body.code;
        const { tokens } = await Oauth2Client.getToken(code);
        Oauth2Client.setCredentials(tokens);
        const usr_info = await oauth2.userinfo.get({ auth: Oauth2Client });
        console.log(usr_info)
        const user_name = usr_info.data.name;

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
})

module.exports = router