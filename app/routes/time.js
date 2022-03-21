const router = require('express').Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const cors = require('cors')()
const addNoCacheHeader = require('../middlewares/addNoCacheHeader')

// Nivell 2 Exercici 1, Nivell 3 Exercici 1

// Li poso tot el middleware a la ruta en comptes de posar-ne a tota l'app (sempre es pot moure algun a app.use més endavant si totes les rutes el necessiten)

router.post('/', [jsonParser, addNoCacheHeader, cors], (req, res) => {

    // Comprova autenticació
    if(req.headers.authorization === undefined ||
        req.headers.authorization.substring(0, 5) != 'Basic'){
            // console.log('Unauthorized attempt');
            res.status(401)
            res.send({
                error: 'Unauthorized'
            })
            return
        }

    // En cas que n'hi hagi fes log
    user_passwd = Buffer.from(req.headers.authorization.substring(6), 'base64').toString()
    // console.log(`BasicAuth From Header: ${user_passwd}`);
    
    // Si no sha rebut nom d'usuari, retorna error
    if(req.body.username == undefined){
        res.status(400)
        res.send({
            error: 'Missing: A JSON with a valid username'
        })
        return
    }

    // Log del nom d'usuari rebut
    let msg = 'Username From JSON body: '
    msg += req.body.username ? req.body.username : 'undefined'
    // console.log(msg);

    // Envia datetime actual
    res.send({
        currentDateTime: Date()
    })
})

module.exports = router