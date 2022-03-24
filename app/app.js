var express = require('express'); 
var app = express(); 
var server = require('http').Server(app); 
var io = require('socket.io')(server); 
var cookieParser = require('cookie-parser')

const defaultRoutes = require('./routes/default')
const loginRoutes = require('./routes/login')
const registerRoutes = require('./routes/register')
const roomsRoutes = require('./routes/rooms')
const chatRoutes = require('./routes/chat')
const userRoutes = require('./routes/user')


global.config = require('./config');


var messages = [{ 
    author: "Guillem P.",
    text: "Missatge preexistent"
}]; 

// Middleware
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/login', loginRoutes)
app.use('/register', registerRoutes)
app.use('/rooms', roomsRoutes)
app.use('/chat', chatRoutes)
app.use('/user', userRoutes)

// Default Routes al final (per wildcards)
app.use('/', defaultRoutes)


// Socket events
io.on('connection', socket => { 
    console.log('Nova connexió per sockets');
    
    // Envia missatges a client
    socket.emit('messages', messages);

    socket.on('new-message', data => { 
        
        messages.push(data);
        
        console.log('Missatges del servidor actualitzats:');
        console.log(messages);

        // Envia missatges A TOTS els clients connectats per socket
        io.sockets.emit('messages', messages); 
    }); 
}); 

// Serve express app
server.listen(80, () => { 
    console.log("Server running on http://localhost:80"); 
});
