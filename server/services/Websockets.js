const socketIO = require("socket.io");
const db = require("../db/db");
const { getTokenData } = require("./jwt_auth");

const setupWebsockets = async (server, CLIENT_ORIGIN) => {

    const io = socketIO(server, {
        cors: {
            origin: CLIENT_ORIGIN,
            methods: ["GET", "POST"]
        }
    });

    // Load historical
    const historical = {}
    for (const room of await db.Room.findAll()) {
        historical[room.name] = [];
    }
    for (const m of await db.Message.findAll()) {
        historical[m.roomName].push({
            author: m.userName,
            room: m.roomName,
            text: m.text,
            ts: m.ts
        })
    }

    // Websockets
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
}

module.exports = { setupWebsockets }