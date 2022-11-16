const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { googleLogin } = require("../controllers/google");

/**
 * Ruta de redirect de google auth (un cop l'usuari ha estat autenticat per Google)
 */
router.post('/', jsonParser, googleLogin);

module.exports = router