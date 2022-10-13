const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { Op } = require('sequelize')
const {
    Player,
    Game
} = require('../db/db')

/*
 UN JUGADOR ESPECÍFIC REALITZA UNA TIRADA: és el servidor qui ha de tirar els daus i no el client.
 */

router.post('/:id', jsonParser, async (req, res) => {

    // Llença daus
    const dice1 = throwDice();
    const dice2 = throwDice();

    try {
        // Valida que player existeix
        const player = await Player.findOne({ where: { id: req.params.id } })
        if (player === null) {
            res.status(400).json({ error: `Player with id ${req.params.id} doesn't exist` })
            return
        }

        // Crea i desa tirada
        const game = await Game.create({
            playerId: req.params.id,
            dice1,
            dice2,
            won: dice1 + dice2 === 7
        })

        // Actualitza winsPercent del player que ha fet una tirada nova
        const winsPercent = await calcUserWinsPercent(req.params.id);
        await Player.update({ winsPercent }, {
            where: { id: req.params.id }
        })

        res.send(game);

    } catch (error) {
        res.status(500).json({ error });
    }
})

/*
 ELIMINA LES TIRADES DEL JUGADOR
 Faig el request idempodent: no faig check ni retorno error quan player no existeixi
 */
router.delete('/:id', jsonParser, async (req, res) => {
    try {
        await Game.destroy({
            where: { playerId: req.params.id }
        });

        // Actualitza winsPercent del jugador
        await Player.update({ winsPercent: null }, {
            where: { id: req.params.id }
        })

        res.send({ message: `Tirades del jugador ${req.params.id} eliminades correctament.` })

    } catch (error) {
        res.status(500).json({ error });
    }
})

/*
 RETORNA EL LLISTAT DE JUGADES PER UN JUGADOR
 */
router.get('/:id', jsonParser, async (req, res) => {
    try {
        const games = await Game.findAll({
            where: { playerId: req.params.id }
        });
        res.send({ games });

    } catch (error) {
        res.status(500).json({ error });
    }
})

/*
 Mètodes accessoris
 */

const throwDice = () => Math.floor(Math.random() * 6) + 1;

const calcUserWinsPercent = async playerId => {
    const count = await Game.count({
        where: { playerId },
    })

    const won = await Game.count({
        where: {
            [Op.and]: [{ playerId }, { won: true }]
        }
    })

    // Resolució bug divisió per zero
    return count === 0 ? 0 : (won / count * 100).toFixed(2) // 2 decimals
}

module.exports = router