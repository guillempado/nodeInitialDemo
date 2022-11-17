const socketIO = require("socket.io");
const db = require("../db/db");
const { getTokenData } = require("./jwt_auth");
const { debug_log } = require("../utils/console_debug");

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

    // Mantindrem també registre de la sala seleccionada per cada usuari
    const users_per_room = {}

    // Websockets
    io.on('connection', socket => {
        // if("token" in socket)
        console.log(`New User connected`)
        try {
            const token = socket.handshake.auth.token;
            debug_log(`Token: ${token}`)
            const user = getTokenData(token);
            debug_log({
                user: user.user,
                password: user.password
            })

            // TODO comprova que conté un user vàlid i que no està caducat (retorna error en aquest cas)


            // Envia missatges a client
            socket.emit('historical', historical);

            // Envia cache de sales seleccionades per usuari
            socket.emit('selected_rooms_cache', users_per_room);

            // Notifica clients de canvi de selecció de room
            socket.on('selected_room_change', async data => {
                const user_name = user.user
                users_per_room[user_name] = data.selectedRoom;
                socket.emit('new_SelectedRoom', {user: user_name, room:data.selectedRoom})
            })

            // Notifica clients de canvi de selecció de room
            socket.on('selected_room_change', async data => {
                const user_name = user.user
                users_per_room[user_name] = data.selectedRoom;
                socket.emit('new_SelectedRoom', {user: user_name, room:data.selectedRoom})
            })

            socket.on('new_client_message', async data => {
                const message = {
                    // Validació de l'user es fa per token! De manera q sigui impossible dir q el missatge és d'un altre usuari
                    author: user.user,
                    text: data.text,
                    ts: new Date()
                };

                debug_log("New message:")
                debug_log(message)

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

                debug_log('Missatges del servidor actualitzats:');
                debug_log(historical);

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