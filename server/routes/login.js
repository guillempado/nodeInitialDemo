const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { passwordLogin } = require("../controllers/login");

router.post('/', jsonParser, passwordLogin)

module.exports = router