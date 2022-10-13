const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { Player } = require('../db/db');

/* CREA UN JUGADOR */

router.post('/', jsonParser, async (req, res) => {

    // Bad request si falta field name
    if (!('name' in req.body)) {
        res.status(400).json({ error: 'Missing JSON body with a \'name\' field in it' })
        return;
    }

    // Si nom buit, assigna 'ANÒNIM'
    if (isEmptyString(req.body.name)) {
        req.body.name = 'ANÒNIM'
    }

    // Comprova si name ja existeix
    try {
        let player = await Player.findOne({ where: { name: req.body.name } });
        //Bad request si name existeix (excepte si és anònim)
        if (req.body.name !== 'ANÒNIM' && player !== null) {
            res.status(400).json({ error: 'Player name already exists!' })
            return;
        }

        // Desa player i retorna OK
        player = await Player.create({ name: req.body.name });
        res.send(player);


    } catch (error) {
        res.status(500).json({ error });
    }
})

/* MODIFICA EL NOM DEL JUGADOR */
/* Disseny: cal identificar els jugadors per id perquè podem tenir més d'un jugador de nom 'ANÒNIM'*/

router.put('/', jsonParser, async (req, res) => {

    // Comprova que el JSON és correcte
    if (!('id' in req.body) ||
        !('newname' in req.body) ||
        !isValidId(req.body.id) ||
        isEmptyString(req.body.newname)) {
        res.status(400).json({ error: 'The atributes {id, newname} need to be filled in a JSON body with valid values' })
        return
    }

    try{
        // Troba id
        let player = await Player.findOne({ where: { id: req.body.id } });

        //Retorna error si player no existeix
        if (player === null) {
            res.status(404).json({ error: `Player with id: ${req.body.id} doesn't exist` })
            return
        }

        // Canvia nom i retorna
        await Player.update(
            { name: req.body.newname },
            { where: { id: req.body.id } }
        );

        res.status(200).json({
            message: `Player ${req.body.id} name updated correctly to: ${req.body.newname}.`
        })


    } catch (error) {
        res.status(500).json({error});
    }

})

router.get('/', async (req, res) => {
    let players = await Player.findAll();
    res.send(players);

})

const isEmptyString = str => str === undefined || str === null || str.trim() === '';
const isValidId = value => {
    const intValue = parseInt(value);
    return typeof intValue == 'number' && intValue !== 0;
}

module.exports = router;