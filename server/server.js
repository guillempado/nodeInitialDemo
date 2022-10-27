require("dotenv").config();
const express = require('express');
const cors = require('cors');
//const log_request = require("./middleware/log_request");
const socketIO = require('socket.io');
const { getTokenData } = require("./common/jwt_auth");

const API_MOUNT_POINT = '/api_v1.0';
const CLIENT_ORIGIN = 'http://localhost';

(async () => {
    await require('./db/method/map_models');
    const app = express();
    app.use(cors({ origin: CLIENT_ORIGIN }));

    // Log request de debug
    // app.use(log_request)

    // És important importar les rutes quan el model ja estigui mapat per tenir disponibles els repositoris d'entitat (game, player, etc.). Per això faig require inline i no a principi del file.
    app.use(`${API_MOUNT_POINT}/auth/login`, require('./routes/login'))
    app.use(`${API_MOUNT_POINT}/auth/signup`, require('./routes/signup'))
    app.use('/', require('./routes/default'))

    const server = app.listen(process.env.SERVER_PORT, () => {
        let host = server.address().address
        host = host !== '::' ? host : 'localhost'
        console.log(`Express server listening on: http://${host}:${process.env.SERVER_PORT}`)
    })

    // Websockets
    const io = socketIO(server, {
        cors: {
            origin: CLIENT_ORIGIN,
            methods: ["GET", "POST"]
        }
    });

    // PROVA DEMO WEBSOCKETS
    const historical = {
        "Room 1": [
            {
                author: "Guillem P.",
                text: "Missatge preexistent"
            },
        ]
    }

    io.on('connection', socket => {
        // if("token" in socket)
        console.log(`User connected`)
        try {
            const token = socket.handshake.auth.token;
            console.log(`Token: ${token}`)
            const user = getTokenData(token);
            console.log({
                user: user.user,
                password: user.password
            })

            // TODO comprova que conté un user vàlid i que no està caducat (retorna error en aquest cas)

            // PROVA DEMO WEBSOCKETS

            // Envia missatges a client
            socket.emit('historical', historical);

            socket.on('new_client_message', data => {
                const message = {
                    // Validació de l'user es fa per token! De manera q sigui impossible dir q el missatge és d'un altre usuari
                    author: user.user,
                    text: data.text
                };

                console.log("New message:")
                console.log(message)

                if (!data.room in historical){
                    historical[data.room] = [];
                }

                historical[data.room].push(message);

                console.log('Missatges del servidor actualitzats:');
                console.log(historical);

                // Envia NOU missatge A TOTS els clients connectats per socket
                io.sockets.emit('new_server_message', {
                    room: data.room,
                    ...message
                });
            });

            socket.on('new_room', room => {
                historical[room] = []
                io.sockets.emit('new_room', room);
            });
        } catch (e) {
            console.log(e)
        }

    });
})()

