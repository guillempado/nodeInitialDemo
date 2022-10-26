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
    app.use(cors({origin: CLIENT_ORIGIN}));

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
    const messages = [{
        author: "Guillem P.",
        text: "Missatge preexistent"
    }];

    io.on('connection', socket => {
        // if("token" in socket)
        console.log(`User connected`)
        try{
            const token = socket.handshake.auth.token;
            console.log(`Token: ${token}`)
            const user = getTokenData(token);
            console.log({user: user.user, password: user.password})

            // TODO comprova que conté un user vàlid i que no està caducat (retorna error en aquest cas)

            // PROVA DEMO WEBSOCKETS

            // Envia missatges a client
            socket.emit('messages', messages);

            socket.on('new-message', data => {

                console.log("Messages:")
                console.log(messages)

                console.log("New data:")
                console.log(data)

                messages.push(data);

                console.log('Missatges del servidor actualitzats:');
                console.log(messages);

                // Envia missatges A TOTS els clients connectats per socket
                io.sockets.emit('messages', messages);
            });
        }
        catch (e) {
            console.log(e)
        }

        //console.log(Object.keys(socket.client))
        //console.log(socket.client)
        });
})()

