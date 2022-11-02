const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const { Op } = require('sequelize');
const { Player } = require('../db/db')

/*
 RETORNA EL PERCENTATGE MIG D’ÈXITS DEL CONJUNT DE TOTS ELS JUGADORS
 */
router.get('/', jsonParser, async (req, res) => {
    try {

        /*
         // Calcula el percentatge d’èxits mig, IMPLEMENTACIÓ ALTERNATIVA: si un jugador té 1000 tirades i winPercent == 50% i un jugador amb una sola tirada té winPercent == 100%, aquest mètode retornaria avg = 50.01% en comptes de 75% (que és el que retornaria la implementació actual).

         const won = await Game.count({ where: { won: true } });
         const total = await Game.count();
         const averageWinsPercent = won / total * 100;
         */

        // Troba i ordena els jugadors
        const players = await Player.findAll();
        players.sort((a, b) => b.winsPercent - a.winsPercent);

        // Calcula averageWinsPercent
        let sum = 0;
        let count = 0;
        for (const player of players) {

            // RAONAMENT IMPLEMENTACIÓ: UN JUGADOR REGISTRAT I SENSE TIRADES NO TÉ PERCENTATGE D'ÈXIT DEL 0% SINÓ NUL! Dit d'altra manera, en cas que un jugador tingui dues tirades amb èxit i un altre encara no hagi jugat, la mitjana d'èxit és del 100% perquè només hi ha un jugador sobre el que fer la mitjana.
            if (player.winsPercent) {
                sum += Number(player.winsPercent);
                count += 1;
            }
        }
        const averageWinsPercent = sum / count;

        // Respon
        res.send({
            averageWinsPercent,
            players
        })

    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/loser', jsonParser, async (req, res) => {
    try {
        const min = await Player.min('winsPercent');
        const player = await Player.findOne({
            where: {
                winsPercent: {
                    [Op.eq]: min
                }
            }
        });
        res.send(player);

    } catch (error) {
        res.status(500).json({ error });
    }
})

router.get('/winner', jsonParser, async (req, res) => {
    try {
        const max = await Player.max('winsPercent');
        const player = await Player.findOne({
            where: {
                winsPercent: {
                    [Op.eq]: max
                }
            }
        });
        res.send(player);

    } catch (error) {
        res.status(500).json({ error });
    }
})

module.exports = router