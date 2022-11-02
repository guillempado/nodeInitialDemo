require("dotenv").config();
const express = require('express');
const cors = require('cors');
//const log_request = require("./middleware/log_request");
const socketIO = require('socket.io');
const { getTokenData } = require("./common/jwt_auth");
const db = require("./db/db");

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
    app.use(`${API_MOUNT_POINT}/auth/google`, require('./routes/google'))
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
    const historical = {}

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

            socket.on('new_client_message', async data => {
                const message = {
                    // Validació de l'user es fa per token! De manera q sigui impossible dir q el missatge és d'un altre usuari
                    author: user.user,
                    text: data.text,
                    ts: new Date()
                };

                console.log("New message:")
                console.log(message)

                // Guarda missatge a base de dades
                await db.Message.create({
                    text: message.text,
                    ts: message.ts,
                    userName: message.author,   // userName és la FK per defecte
                    roomName: data.room         // roomName és la FK per defecte
                })

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

            socket.on('new_room', async room => {

                historical[room] = []

                // Guarda nou room a BBDD
                await db.Room.create({
                    name: room
                })

                io.sockets.emit('new_room', room);
            });
        } catch (e) {
            console.log(e)
        }

    });
})()

