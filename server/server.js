require("dotenv").config();
const express = require('express');

(async () => {
    await require('./db/method/map_models');
    const app = express();

    // És important importar les rutes quan el model ja estigui mapat per tenir disponibles els repositoris d'entitat (game, player, etc.). Per això faig require inline i no a principi del file.
    /*
    app.use('/players', require('./routes/players'))
    app.use('/games', require('./routes/games'))
    app.use('/ranking', require('./routes/ranking'))

     */
    app.use('/register', require('./routes/register'))
    app.use('/login', require('./routes/login'))
    app.use('/', require('./routes/default'))

    const server = app.listen(process.env.SERVER_PORT, () => {
        let host = server.address().address
        host = host !== '::' ? host : 'localhost'
        console.log(`Express server listening on: http://${host}:${process.env.SERVER_PORT}`)
    })
})()

