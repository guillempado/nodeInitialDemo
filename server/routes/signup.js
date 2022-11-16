const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { passwordSignup } = require("../controllers/signup");

router.post('/', jsonParser, passwordSignup)

module.exports = router