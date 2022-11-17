require("dotenv").config();
const express = require('express');
const cors = require('cors');

const API_MOUNT_POINT = '/api_v1.0';
const CLIENT_ORIGIN = 'http://localhost';

const { setupWebsockets } = require('./services/Websockets');

(async () => {
    await require('./db/method/map_models');
    const app = express();
    app.use(cors({ origin: CLIENT_ORIGIN }));

    // Log request de debug
    // app.use(log_request)

    // És important importar les rutes quan el model ja estigui mapat per tenir disponibles els repositoris d'entitat (game, player, etc.). Per això faig require inline i no a principi del file.
    app.use(`${API_MOUNT_POINT}/auth/login`, require('./routes/login'))
    app.use(`${API_MOUNT_POINT}/auth/signup`, require('./routes/signup'))
    app.use(`${API_MOUNT_POINT}/auth/google`, require('./routes/google'))
    app.use('/', require('./routes/default'))

    const server = app.listen(process.env.SERVER_PORT, () => {
        let host = server.address().address
        host = host !== '::' ? host : 'localhost'
        console.log(`Express server listening on: http://${host}:${process.env.SERVER_PORT}`)
    })

    // Websockets
    await setupWebsockets(server, CLIENT_ORIGIN)

})()

